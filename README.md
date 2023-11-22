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
- [API Reference](#api)

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
<a name="MPD"></a>

## API

### MPD

**Kind**: global class

- [MPD](#MPD)
  - [new MPD(config)](#new_MPD_new)
  - [.createMpd(videoData)](#MPD+createMpd)
  - [.createPeriod(id)](#MPD+createPeriod)
  - [.createAdaptationSet(mimetype)](#MPD+createAdaptationSet) ⇒
  - [.createContentComponent(contentType, id)](#MPD+createContentComponent)
  - [.createSegmentTemplate(videoData, timescale, duration, startNumber, media)](#MPD+createSegmentTemplate)
  - [.getXMLString()](#MPD+getXMLString) ⇒ <code>string</code>
  - [.getXMLFile()](#MPD+getXMLFile) ⇒ <code>File</code>

<a name="new_MPD_new"></a>

#### new MPD(config)

| Param  | Type                | Description                           |
| ------ | ------------------- | ------------------------------------- |
| config | <code>object</code> | configuration object for the manifest |

<a name="MPD+createMpd"></a>

#### mpD.createMpd(videoData)

**Kind**: instance method of [<code>MPD</code>](#MPD)

| Param     | Type                | Description                                                |
| --------- | ------------------- | ---------------------------------------------------------- |
| videoData | <code>Buffer</code> | initial video data for the stream, must be less than 100kb |

<a name="MPD+createPeriod"></a>

#### mpD.createPeriod(id)

**Kind**: instance method of [<code>MPD</code>](#MPD)

| Param | Type                 | Description          |
| ----- | -------------------- | -------------------- |
| id    | <code>integer</code> | the id of the period |

<a name="MPD+createAdaptationSet"></a>

#### mpD.createAdaptationSet(mimetype) ⇒

**Kind**: instance method of [<code>MPD</code>](#MPD)  
**Returns**: a yielded mimeType attribute

| Param    | Type                | Default                             | Description                 |
| -------- | ------------------- | ----------------------------------- | --------------------------- |
| mimetype | <code>string</code> | <code>&quot;video/webm&quot;</code> | The MIME type of the stream |

<a name="MPD+createContentComponent"></a>

#### mpD.createContentComponent(contentType, id)

**Kind**: instance method of [<code>MPD</code>](#MPD)

| Param       | Type                 | Default                        | Description                                 |
| ----------- | -------------------- | ------------------------------ | ------------------------------------------- |
| contentType | <code>string</code>  | <code>&quot;video&quot;</code> | The content type of the media being streams |
| id          | <code>integer</code> | <code>1</code>                 | The id of the content component             |

<a name="MPD+createSegmentTemplate"></a>

#### mpD.createSegmentTemplate(videoData, timescale, duration, startNumber, media)

**Kind**: instance method of [<code>MPD</code>](#MPD)

| Param       | Type                 | Default           | Description                                 |
| ----------- | -------------------- | ----------------- | ------------------------------------------- |
| videoData   | <code>Buffer</code>  |                   | videoData to be streamed for initialization |
| timescale   | <code>integer</code> | <code>1000</code> | The timescale of the media in microseconds  |
| duration    | <code>integer</code> | <code>2000</code> | The duration of the media in microseconds   |
| startNumber | <code>integer</code> | <code>1</code>    | The start number of the media content       |
| media       | <code>string</code>  |                   | The media URL for update PUTs               |

<a name="MPD+getXMLString"></a>

#### mpD.getXMLString() ⇒ <code>string</code>

**Kind**: instance method of [<code>MPD</code>](#MPD)  
**Returns**: <code>string</code> - str - XML string representation of the manifest  
<a name="MPD+getXMLFile"></a>

#### mpD.getXMLFile() ⇒ <code>File</code>

**Kind**: instance method of [<code>MPD</code>](#MPD)  
**Returns**: <code>File</code> - file - A new File named init.mpd which contains the manifest XML
