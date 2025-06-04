(function() {
  const style = document.createElement('style');
  style.textContent = `
    #miniPlayer {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 300px;
      background: #000;
      border-radius: 12px;
      overflow: hidden;
      z-index: 999999;
      box-shadow: 0 4px 8px rgba(0,0,0,0.3);
    }
    #miniPlayer video {
      width: 100%;
      display: block;
    }
    #miniPlayerControls {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 6px;
    }
    #miniPlayerControls button {
      border: none;
      background: transparent;
      color: #fff;
      cursor: pointer;
      font-size: 14px;
    }
    #miniPlayerControls input[type="range"] {
      flex: 1;
      margin: 0 4px;
    }
    .miniBtn {
      position: absolute;
      bottom: 10px;
      right: 10px;
      padding: 4px 8px;
      background: rgba(0,0,0,0.7);
      color: #fff;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      z-index: 9999;
    }
  `;
  document.head.appendChild(style);

  function createMiniButton(video) {
    const btn = document.createElement('button');
    btn.textContent = 'Mini';
    btn.className = 'miniBtn';
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      openMiniPlayer(video);
    });
    video.parentElement.style.position = 'relative';
    video.parentElement.appendChild(btn);
  }

  function openMiniPlayer(video) {
    const wrapper = document.createElement('div');
    wrapper.id = 'miniPlayer';

    const vid = video.cloneNode(true);
    vid.controls = true;
    wrapper.appendChild(vid);

    const controls = document.createElement('div');
    controls.id = 'miniPlayerControls';

    const back = document.createElement('button');
    back.textContent = '«10s';
    back.onclick = () => { vid.currentTime -= 10; };

    const fwd = document.createElement('button');
    fwd.textContent = '10s»';
    fwd.onclick = () => { vid.currentTime += 10; };

    const volume = document.createElement('input');
    volume.type = 'range';
    volume.min = 0;
    volume.max = 1;
    volume.step = 0.1;
    volume.value = vid.volume;
    volume.oninput = () => { vid.volume = volume.value; };

    const close = document.createElement('button');
    close.textContent = '✕';
    close.onclick = () => wrapper.remove();

    controls.append(back, volume, fwd, close);
    wrapper.appendChild(controls);

    document.body.appendChild(wrapper);
    vid.play();
  }

  document.querySelectorAll('video').forEach((v) => {
    if (!v.dataset.miniButton) {
      v.dataset.miniButton = 'true';
      createMiniButton(v);
    }
  });
})();
