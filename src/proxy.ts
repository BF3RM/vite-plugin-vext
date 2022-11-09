import fs from 'node:fs';
import path from 'node:path';

const generateProxyFileContent = (devServerPort: number) => `
<script>
	(async () => {
		try {
			console.info("[Bootstrap] Loading development WebUI...");
			await fetch("http://localhost:${devServerPort}", {
				mode: "no-cors",
				method: "HEAD"
			});
			console.info("[Bootstrap] Development WebUI is online!");
			window.location.href = "http://localhost:${devServerPort}";
		} catch(err) {
			console.error("[Bootstrap] Development WebUI is not online!", err);

			const div = document.createElement('h1');
			div.style.margin = 0;
			div.style.display = "flex";
			div.style.justifyContent = "center";
			div.style.alignItems = "center";
			div.style.height = "100%";

			div.innerHTML = "Failed to load development WebUI, reason: UI_OFFLINE"
			document.body.appendChild(div);
		}
	})();
</script>
`

export function createProxyFile(devServerPort: number) {
    const content = generateProxyFileContent(devServerPort);

    const filePath = path.resolve(__dirname, '../proxy/index.html');

    return new Promise<void>((resolve, reject) => {
        fs.writeFile(filePath, content, (err) => {
            if (err) {
                reject(err);
                return;
            }

            resolve();
        })
    });
}