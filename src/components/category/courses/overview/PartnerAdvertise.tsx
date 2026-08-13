"use client";

import React, { useState } from "react";

export default function PartnerAdvertise() {
    const [isOpen, setIsOpen] = useState(true);

    if (!isOpen) {
        return (
            <button onClick={() => setIsOpen(true)}>
                Show Partner Ad
            </button>
        );
    }

    return null;
}
