const MANIFEST_URL = "manifest.json";
const localHost = ['127.0.0.1', 'localhost'];
async function main() {
    const isLocal = !!~localHost.indexOf(window.location.hostname);
    const manifestJson = await (await fetch(MANIFEST_URL)).json();
    const host = isLocal ? manifestJson.localHost : manifestJson.prodcutionHost;
    const videoComponent = new VideoComponent();
    const network = new Network(host);
    const videoPlayer = new VideoMediaPlayer(manifestJson,network);

    videoPlayer.initializeCodec();
    videoComponent.initializePlayer();

}

window.onload = main