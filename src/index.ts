import { PluginOption } from 'vite';
import { join } from "path";

import { VuicCompiler } from "./compiler";
import { createProxyFile } from './proxy';

export interface VextPluginConfig {
    // Output path, defaults to the parent folder (../)
    outputPath?: string;
}

export default function vext(options?: VextPluginConfig): PluginOption {

    const outputPath = options?.outputPath || '../';
    const vuicc = new VuicCompiler(join(__dirname, 'vuicc.exe'));

    return {
        name: 'vite-plugin-vext',
        async configureServer(server) {
            if (process.platform !== 'win32') {
                console.warn('vuicc.exe currently only supports Windows, compiler disabled.');
                return;
            }

            server.httpServer?.once('listening', async () => {
                await createProxyFile(server.config.server.port!);

                await vuicc.compile({
                    sourcePath: join(__dirname, '..', 'proxy'),
                    outputPath
                });
            });
        },
        writeBundle(options, _bundle) {
            if (process.platform !== 'win32') {
                this.warn('vuicc.exe currently only supports Windows, compiler disabled.');
                return;
            }

            return vuicc.compile({
                sourcePath: options.dir!,
                outputPath
            });
        }
    }
}