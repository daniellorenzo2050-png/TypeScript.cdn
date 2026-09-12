// Type definitions for JSZip 3.10
// Project: https://github.com/Stuk/jszip
// Definitions by: mzeiher <https://github.com/mzeiher>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/// <reference types="node" />

export = JSZip;

class JSZip {
    static support: {
        arraybuffer: boolean;
        uint8array: boolean;
        arrayview: boolean;
        blob: boolean;
        nodebuffer: boolean;
        nodestream: boolean;
    };

    static version: string;

    static loadAsync(
        data: JSZip.InputFileFormat,
        options?: JSZip.JSZipLoadOptions
    ): Promise<JSZip>;

    files: { [key: string]: JSZip.JSZipObject };

    constructor();

    file(path: string, data: JSZip.InputFileFormat, options?: JSZip.JSZipFileOptions): this;
    file(path: string, data: null, options?: JSZip.JSZipFileOptions & { dir: true }): this;
    file(regex: RegExp): JSZip.JSZipObject[];
    file(path: string): JSZip.JSZipObject | null;

    folder(name: string): this;
    folder(regex: RegExp): JSZip.JSZipObject[];

    forEach(callback: (relativePath: string, file: JSZip.JSZipObject) => void): void;

    remove(path: string): this;

    generateAsync<T extends JSZip.OutputType>(
        options?: JSZip.JSZipGeneratorOptions<T>,
        onUpdate?: (metadata: JSZip.Metadata) => void
    ): Promise<JSZip.OutputTypeMap[T]>;

    generateNodeStream(
        options?: JSZip.JSZipGeneratorOptions<'node'>,
        onUpdate?: (metadata: JSZip.Metadata) => void
    ): NodeJS.ReadableStream;
}

namespace JSZip {
    type OutputType = 'base64' | 'string' | 'text' | 'binarystring' | 'arraybuffer' | 'uint8array' | 'blob' | 'nodebuffer';

    interface OutputTypeMap {
        base64: string;
        string: string;
        text: string;
        binarystring: string;
        arraybuffer: ArrayBuffer;
        uint8array: Uint8Array;
        blob: Blob;
        nodebuffer: Buffer;
    }

    type InputFileFormat =
        | string
        | number[]
        | Uint8Array
        | ArrayBuffer
        | Blob
        | NodeJS.ReadableStream
        | Promise<string | number[] | Uint8Array | ArrayBuffer | Blob | NodeJS.ReadableStream>;

    interface Metadata {
        percent: number;
        currentFile: string | null;
    }

    interface JSZipFileOptions {
        base64?: boolean;
        binary?: boolean;
        date?: Date;
        compression?: string;
        compressionOptions?: {
            level?: number;
        };
        comment?: string;
        unixPermissions?: string | number;
        dosPermissions?: number;
        dir?: boolean;
    }

    interface JSZipLoadOptions {
        base64?: boolean;
        checkCRC32?: boolean;
        optimizedBinaryString?: boolean;
        createFolders?: boolean;
        decodeFileName?: (bytes: Uint8Array | number[]) => string;
    }

    interface JSZipGeneratorOptions<T extends OutputType> {
        type?: T;
        compression?: string;
        compressionOptions?: {
            level?: number;
        };
        comment?: string;
        mimeType?: string;
        base64?: boolean;
        platform?: 'DOS' | 'UNIX';
        zip64?: boolean;
        streamFiles?: boolean;
    }

    interface JSZipObject {
        name: string;
        dir: boolean;
        date: Date;
        comment: string;
        dosPermissions: number | null;
        unixPermissions: number | null;
        options: {
            binary: boolean;
            optimizedBinaryString: boolean;
            base64: boolean;
            compression: string;
            compressionOptions: any;
            comment: string;
            createFolders: boolean;
            date: Date;
            dir: boolean;
            unixPermissions: string | number;
            dosPermissions: number;
        };
        async<T extends OutputType>(
            type: T,
            onUpdate?: (metadata: Metadata) => void
        ): Promise<OutputTypeMap[T]>;
        nodeStream(
            type?: 'node',
            onUpdate?: (metadata: Metadata) => void
        ): NodeJS.ReadableStream;
    }
}
