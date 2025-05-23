class PeerService {
  constructor() {
    this.createPeer(); // initialize on construct
  }

  createPeer() {
    this.peer = new RTCPeerConnection({
      iceServers: [
        {
          urls: [
            "stun:stun.l.google.com:19302",
            "stun:global.stun.twilio.com:3478",
          ],
        },
      ],
    });
  }

  async getAnswer(offer) {
    if (!this.peer || this.peer.signalingState === "closed") {
      this.createPeer();
    }
    await this.peer.setRemoteDescription(offer);
    const ans = await this.peer.createAnswer();
    await this.peer.setLocalDescription(new RTCSessionDescription(ans));
    return ans;
  }

  async setLocalDescription(ans) {
    if (!this.peer || this.peer.signalingState === "closed") {
      this.createPeer();
    }
    await this.peer.setRemoteDescription(new RTCSessionDescription(ans));
  }

  async getOffer() {
    if (!this.peer || this.peer.signalingState === "closed") {
      this.createPeer();
    }
    const offer = await this.peer.createOffer();
    await this.peer.setLocalDescription(new RTCSessionDescription(offer));
    return offer;
  }
}

export default new PeerService();
