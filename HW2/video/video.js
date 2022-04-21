class VideoComponent extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    this.getVideoLayout().then((r) => {
      const element = this.parseHTML(r);
      const videoId = this.getAttribute("data-video-id");
      const fullSource = element.getAttribute("src") + videoId;
      element.setAttribute("src", fullSource);

      shadow.appendChild(element);
    });

    this.getSize().then((r) => {
      const videoHeight = this.getAttribute("data-height");
      const videoHeightStyle = `.video {height: ${videoHeight}}`;
      const styleHeight = document.createElement("style");
      styleHeight.textContent = videoHeight ? r + videoHeightStyle : r;

      const videoWidth = this.getAttribute("data-width");
      const videoWidthStyle = `.video {width: ${videoWidth}}`;
      const styleWidth = document.createElement("style");
      styleWidth.textContent = videoWidth ? r + videoWidthStyle : r;

      shadow.append(styleHeight, styleWidth);
    });
  }

  async getVideoLayout() {
    let layout = await fetch("video/video.html");
    return layout.text();
  }

  async getSize() {
    let css = await fetch("video/video.css");
    return css.text();
  }

  parseHTML(str) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(str, "text/html");
    return doc.body.firstChild;
  }
}

customElements.define("yt-video", VideoComponent);
