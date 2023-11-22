# DASH Manifest Creator

![SDE Logo](./logo.svg)

Create DASH manifests in the browser for live streaming!
Shake DASH Encoder (SDE) is a browser-only DASH encoder for Javascript.
It is based on the [Youtube HTTP DASH specification](https://developers.google.com/youtube/v3/live/guides/encoding-with-dash) but can be modified to fit any format.
Created by [Jyrone Parker](https://jyroneparker.com) and is completely open source. If you would like to contribute consider sponsoring me!

# Table Of Contents

- [Installation](#install)
- [Usage](#usage)
- [Bug Reporting](#bug-reporting)
- [Contributing](#contributing)

## Installation

This package is available on NPM
`npm i dash-manifest-creator`

## Usage

```javascript
import { MPD } from "dash-manifest-creator";

const mpd = new MPD();
const dash = mpd.createMpd(videoChunk1);

// generate a new manifest
dash.next();

// generate another manifest down the line
dash.next(videoChunk2);

// generate XML string
const str = mpd.getXMLString();

// generate XML file
const file = mpd.getXMLFile();
```

For more docs on the MPD class see the [docs](./docs/index.html) directory.

## Bug Reporting

TODO

## Contributing

TODO
