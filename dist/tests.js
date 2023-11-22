(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MPD = void 0;
/*
<?xml version="1.0" encoding="UTF-8"?>
<MPD xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
     xmlns="urn:mpeg:dash:schema:mpd:2011"
     xsi:schemaLocation="urn:mpeg:dash:schema:mpd:2011 DASH-MPD.xsd"
     type="dynamic"
     profiles="urn:mpeg:dash:profile:isoff-live:2011"
     minimumUpdatePeriod="PT60S"
     minBufferTime="PT12S"
     availabilityStartTime="2016-04-13T20:52:58" >
  <Period start="PT0S" id="1">
    <AdaptationSet mimeType="video/webm">
      <ContentComponent contentType="video" id="1"/>
      <SegmentTemplate timescale="1000"
           duration="2000"
           startNumber="1"
           initialization="data:video/mp4;base64,AAAAGGZ0eXBpc...AAA"
           media="/dash_upload?cid=xxxx-xxxx-xxxx-xxxx&copy=0&file=media-$Number%09d$.webm"/>
    </AdaptationSet>
  </Period>
</MPD>
*/
class MPD {
  constructor(config = {
    mediaUrl: '',
    startNumber: 1,
    startTime: 0,
    timeOffset: 0,
    periodId: 1,
    minimumUpdatePeriod: 'PT60S',
    type: 'dynamic',
    profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
    minBufferTime: 'PT12S',
    mimetype: 'video/webm'
  }) {
    this.doc = document.implementation.createDocument(null, 'mpd');
    this.mpd = null;
    this.config = config;
    this.serializer = new XMLSerializer();
  }
  *createMpd(videoData = new ArrayBuffer(100)) {
    while (true) {
      this.mpd = this.doc.createElement('MPD');
      const date = new Date(Date.now()).toISOString();
      this.mpd.setAttribute('xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance');
      this.mpd.setAttribute('xmlns', 'urn:mpeg:dash:schema:mpd:2011');
      this.mpd.setAttribute('xsi:schemaLocation', 'urn:mpeg:dash:schema:mpd:2011 DASH-MPD.xsd');
      this.mpd.setAttribute('type', this.config.type);
      this.mpd.setAttribute('profiles', this.config.profiles);
      this.mpd.setAttribute('minimumUpdatePeriod', this.config.minimumUpdatePeriod);
      this.mpd.setAttribute('minBufferTime', this.config.minBufferTime);
      this.mpd.setAttribute('availabilityStartTime', date);
      // create generators
      const periodGenerator = this.createPeriod(this.config.startNumber);
      const adaptationSetGenerator = this.createAdaptationSet(this.config.mimetype);
      const contentComponentGenerator = this.createContentComponent('video', this.config.startNumber);
      const segmentTemplateGenerator = this.createSegmentTemplate(videoData, "1000", "2000", 1, this.config.mediaUrl);

      // generate elements
      const period = periodGenerator.next().value;
      const adaptationSet = adaptationSetGenerator.next().value;
      const contentComponent = contentComponentGenerator.next().value;
      const segmentTemplate = segmentTemplateGenerator.next().value;

      // append elements
      adaptationSet.appendChild(contentComponent);
      adaptationSet.appendChild(segmentTemplate);
      period.appendChild(adaptationSet);
      this.mpd.appendChild(period);
      this.config.startNumber++;
      yield this.mpd;
    }
  }

  /**
   * 
   * @param {integer} el - start time of the period
   * @param {integer} timeOffset - time offset for start time
   * @param {integer} id - the id of the period
   */
  *createPeriod(id) {
    const period = this.doc.createElement('Period');
    while (true) {
      period.setAttribute('start', `PT${this.config.startTime + this.config.timeOffset}S`);
      period.setAttribute('id', id);
      console.log('ID:::', id);
      yield period;
    }
  }

  /**
   * 
   * @param {string} mimetype - The MIME type of the stream
   * @returns a yielded mimeType attribute
   */
  *createAdaptationSet(mimetype = 'video/webm') {
    const as = this.doc.createElement('AdaptationSet');
    as.setAttribute('mimeType', mimetype);
    while (true) {
      yield as;
    }
  }
  *createContentComponent(contentType = 'video', id = 1) {
    const cc = this.doc.createElement('ContentComponent');
    cc.setAttribute('contentType', contentType);
    while (true) {
      console.log(id);
      cc.setAttribute('id', id);
      id++;
      yield cc;
    }
  }
  *createSegmentTemplate(videoData = new ArrayBuffer(100), timescale = "1000", duration = "2000", startNumber = "1", media = '') {
    const st = this.doc.createElement('SegmentTemplate');
    st.setAttribute('startNumber', startNumber);
    st.setAttribute('duration', duration);
    st.setAttribute('timescale', timescale);
    st.setAttribute('media', media);
    while (true) {
      st.setAttribute('initialization', "data:video/webm;base64," + btoa(videoData));
      yield st;
    }
  }
  getXMLString() {
    return this.serializer.serializeToString(this.mpd);
  }
  getXMLFile() {
    return new File([this.getXMLString()], 'init.mpd', {
      type: 'text/xml'
    });
  }
}
exports.MPD = MPD;

},{}],2:[function(require,module,exports){
"use strict";

var _MPD = require("./classes/MPD");
const m = new _MPD.MPD();
const mpd = m.createMpd();
mpd.next();
console.log(m.getXMLString());
mpd.next();
console.log(m.getXMLString());
mpd.next();
console.log(m.getXMLString());
console.log(m.getXMLFile());

},{"./classes/MPD":1}]},{},[2]);
