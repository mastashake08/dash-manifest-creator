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

export default class MPD {
  constructor (videoData = null) {
    doc = document.implementation.createDocument("", "", null)
    video = videoData
  }
  createMpd (videoData = this.video) {
    const date = Date.now()
    const mpd = this.doc.createElement('MPD')
    mpd.setAttribute('xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance')
    mpd.setAttribute('xmlns', 'urn:mpeg:dash:schema:mpd:2011')
    mpd.setAttribute('xsi:schemaLocation', 'urn:mpeg:dash:schema:mpd:2011 DASH-MPD.xsd')
    mpd.setAttribute('type', 'dynamic')
    mpd.setAttribute('profiles', 'urn:mpeg:dash:profile:isoff-live:2011')
    mpd.setAttribute('minimumUpdatePeriod', 'PT60S')
    mpd.setAttribute('minBufferTime', 'PT12S')
    mpd.setAttribute('availabilityStartTime', date.toISOString())
    const period = createPeriod('MPD')
    const as = createAdaptationSet(period)
    const cc = createContentComponent(period)
    const st = createSegmentTemplate(period, 1000, 2000, 1, videoData, '')
  }

  createPeriod (el) {
    const period = el.createElement('Period')
    period.setAttribute('start', 'PT0S')
    period.setAttribute('id', 1)
    return period
  }

  createAdaptationSet (el, mimetype = 'video/webm') {
    const as = el.createElement('AdaptationSet')
    as.setAttribute('mimeType', mimetype)
    return as
  }

  createContentComponent (el) {
    const cc = el.createElement('ContentComponent')
    return cc
  }

  createSegmentTemplate (el, timescale = 1000, duration = 2000, startNumber = 1, videoData = this.video, media = '') {
    const st = el.createElement('SegmentTemplate')
    st.setAttribute('timescale', timescale)
    st.setAttribute('duration', duration)
    st.setAttribute('startNumber', startNumber)
    st.setAttribute('initialization', btoa(videoData))
    st.setAttribute('media', media)
    return cc

  }
}
