var PeerManager = (function() {

    var localId,
        config = {
            peerConnectionConfig: {
                iceServers: [{
                    "urls": "stun:stun.l.google.com:19302"
                }, {
                    "urls": "stun:stun.voip.aebc.com"
                }, {
                    "urls": "stun:stun.services.mozilla.com"
                }, {
                    "urls": "stun:stun.stunprotocol.org"
                }, {
                    "urls": "stun:provserver.televolution.net"
                }, {
                    "urls": "stun:stun1.l.google.com:19302"
                }, {
                    "urls": 'turn:numb.viagenie.ca',
                    "credential": '123@son231994',
                    "username": 'nvs231994@gmail.com'
                }, {
                    "urls": 'stun:numb.viagenie.ca',
                    "credential": '123@son231994',
                    "username": 'nvs231994@gmail.com'
                }, {
                    "url": 'turn:192.158.29.39:3478?transport=udp',
                    "credential": 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
                    "username": '28224511:1379330808'
                }, {
                    "url": 'turn:192.158.29.39:3478?transport=tcp',
                    "credential": 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
                    "username": '28224511:1379330808'
                }]
            },
            peerConnectionConstraints: {
                optional: [
                    { "DtlsSrtpKeyAgreement": true }
                ]
            }
        },
        peerDatabase = {},
        localStream,
        remoteVideoContainer = document.getElementById('remoteVideosContainer'),
        socket = io('https://125.253.113.15:9000');

    socket.on('message', handleMessage);
    socket.on('id', function(id) {
        localId = id;
    });

    function addPeer(remoteId) {
        var peer = new Peer(config.peerConnectionConfig, config.peerConnectionConstraints);
        peer.pc.onicecandidate = function(event) {
            if (event.candidate) {
                send('candidate', remoteId, {
                    label: event.candidate.sdpMLineIndex,
                    id: event.candidate.sdpMid,
                    candidate: event.candidate.candidate
                });
            }
        };
        peer.pc.onaddstream = function(event) {
            peer.remoteVideoEl.src = window.URL.createObjectURL(event.stream);
            // attachMediaStream(peer.remoteVideoEl, event.stream);
            remoteVideosContainer.appendChild(peer.remoteVideoEl);
        };
        peer.pc.onremovestream = function(event) {
            peer.remoteVideoEl.src = '';
            remoteVideosContainer.removeChild(peer.remoteVideoEl);
        };
        peer.pc.oniceconnectionstatechange = function(event) {
            switch (
                (event.srcElement // Chrome
                    || event.target) // Firefox
                .iceConnectionState) {
                case 'disconnected':
                    remoteVideosContainer.removeChild(peer.remoteVideoEl);
                    break;
            }
        };
        peerDatabase[remoteId] = peer;

        return peer;
    }

    function answer(remoteId) {
        var pc = peerDatabase[remoteId].pc;
        pc.createAnswer(
            function(sessionDescription) {
                pc.setLocalDescription(sessionDescription);
                send('answer', remoteId, sessionDescription);
            },
            error
        );
    }

    function offer(remoteId) {
        var pc = peerDatabase[remoteId].pc;
        pc.createOffer(
            function(sessionDescription) {
                pc.setLocalDescription(sessionDescription);
                send('offer', remoteId, sessionDescription);
            },
            error
        );
    }

    function handleMessage(message) {
        var type = message.type,
            from = message.from,
            pc = (peerDatabase[from] || addPeer(from)).pc;

        console.log('received ' + type + ' from ' + from);

        switch (type) {
            case 'init':
                toggleLocalStream(pc);
                offer(from);
                break;
            case 'offer':
                pc.setRemoteDescription(new RTCSessionDescription(message.payload), function() {}, error);
                answer(from);
                break;
            case 'answer':
                console.log('answer')
                pc.setRemoteDescription(new RTCSessionDescription(message.payload), function() {}, error);
                break;
            case 'candidate':
                if (pc.remoteDescription) {
                    pc.addIceCandidate(new RTCIceCandidate({
                        sdpMLineIndex: message.payload.label,
                        sdpMid: message.payload.id,
                        candidate: message.payload.candidate
                    }), function() {}, error);
                }
                break;
        }
    }

    function send(type, to, payload) {
        console.log('sending ' + type + ' to ' + to);

        socket.emit('message', {
            to: to,
            type: type,
            payload: payload
        });
    }

    function toggleLocalStream(pc) {
        if (localStream) {
            (!!pc.getLocalStreams().length) ? pc.removeStream(localStream): pc.addStream(localStream);
        }
    }

    function error(err) {
        console.log(err);
    }

    return {
        getId: function() {
            return localId;
        },

        setLocalStream: function(stream) {

            // if local cam has been stopped, remove it from all outgoing streams.
            if (!stream) {
                for (id in peerDatabase) {
                    pc = peerDatabase[id].pc;
                    if (!!pc.getLocalStreams().length) {
                        pc.removeStream(localStream);
                        offer(id);
                    }
                }
            }

            localStream = stream;
        },

        toggleLocalStream: function(remoteId) {
            peer = peerDatabase[remoteId] || addPeer(remoteId);
            toggleLocalStream(peer.pc);
        },

        peerInit: function(remoteId) {
            peer = peerDatabase[remoteId] || addPeer(remoteId);
            send('init', remoteId, null);
        },

        peerRenegociate: function(remoteId) {
            offer(remoteId);
        },

        send: function(type, payload) {
            socket.emit(type, payload);
        }
    };

});

var Peer = function(pcConfig, pcConstraints) {
    this.pc = new RTCPeerConnection(pcConfig, pcConstraints);
    this.remoteVideoEl = document.createElement('video');
    this.remoteVideoEl.controls = true;
    this.remoteVideoEl.autoplay = true;
}
