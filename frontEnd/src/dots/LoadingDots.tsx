import React from "react";
import { LoadingDotsProps } from "./types";
import { Container } from "./components/container";
import { LoadingDotContextProvider } from "./components/context";

export const LoadingDots = ({
    animation = "pulse",
    color = "black",
    delay = 260,
    dots = 3,
    size = 10,
    spacing = 2,
}: LoadingDotsProps): JSX.Element => {
    return (
        <LoadingDotContextProvider
            values={{ animation, dots, color, size, spacing, delay }}
        >
            <Container />
        </LoadingDotContextProvider>
    );
};