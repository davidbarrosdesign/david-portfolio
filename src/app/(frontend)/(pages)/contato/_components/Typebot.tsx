'use client';

import { Standard } from "@typebot.io/react";

export function Typebot() {
    return (
        <Standard
            typebot="my-typebot-a0v7k3o"
            apiHost="https://typebot.io"
            style={{ width: "100%", height: "800px" }}
        />
    );
}