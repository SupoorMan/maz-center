<template>
  <div>
    <video ref="videoPlayer" controls></video>
    <button @click="loadVideo">Load Video</button>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const connectWebSocket = () => {
      let ws = ref<WebSocket>(null);
      ws.value = new WebSocket('ws://127.0.0.1:8033/video');
      ws.value.binaryType = 'arraybuffer';

      ws.value.onopen = () => {
        console.log('WebSocket connected');
        ws.value?.send("1");
      };

      ws.value.onmessage = (message) => {
        const blob = new Blob([message.data], { type: 'video/mp4' });

        const url = URL.createObjectURL(blob);
        flvPlayer.value.src = url;
        flvPlayer.value.reload();
      };

      ws.value.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      ws.value.onclose = () => {
        console.log('WebSocket disconnected');
      };
    }

    const videoPlayer = ref(null);
    const mediaSource = new MediaSource();
    let sourceBuffer;

    mediaSource.addEventListener('sourceopen', () => {
      const mimeType = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';
      if (mediaSource.isTypeSupported(mimeType)) {
        sourceBuffer = mediaSource.addSourceBuffer(mimeType);
      } else {
        console.error('Unsupported MIME type or codec');
      }
    });

    async function fetchVideoSegment(url) {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      return new Uint8Array(arrayBuffer);
    }

    async function loadVideo() {
      const videoUrls = [
        'path/to/segment1.mp4',
        'path/to/segment2.mp4',
        // 添加更多分段视频 URL
      ];

      videoPlayer.value.src = URL.createObjectURL(mediaSource);

      for (const url of videoUrls) {
        const segment = await fetchVideoSegment(url);
        if (sourceBuffer) {
          sourceBuffer.appendBuffer(segment);
        }
      }

      sourceBuffer.endOfStream();
    }

    onMounted(() => {
      videoPlayer.value.addEventListener('ended', () => {
        console.log('Video playback ended');
      });
    });

    return {
      videoPlayer,
      loadVideo,
    };
  },
};
</script>