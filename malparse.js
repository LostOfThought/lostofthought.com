let getNodeText = (node) => {
  if(!node){
    return null;
  }
  return node.innerText.trim();
};

window.onload = () => {
  fetch('https://us-central1-lostofthought-com.cloudfunctions.net/cors?url='
    + encodeURIComponent('https://myanimelist.net/animelist/LostOfThought')
    + '&cache=false'
  ).then( (response) => {return response.text(); } ).then( (response) => {
    let remote = document.createElement('div');
    remote.innerHTML = /<div id="list_surround">(.*)<div id="copyright"/s.exec(response)[1];
    let headers = remote.querySelectorAll('table[class^="header_"]');
    let list = [];
    headers.forEach((v, i, a) => {
      let animes = [];
      let tr = v.nextElementSibling;
      tr = v.nextElementSibling;
      while(tr){
        if(tr.matches('table') && (!tr.querySelector('td[class="table_header"]'))){
          let tds = tr.querySelectorAll('td');
          if(!tds[1]){ // Summary
            let status = v.className.split('_')[1];
            animes.forEach((v) => {
              v.status = status;
              if(status === 'completed'){
                let progress = parseInt(v.progress); 
                v.progress = {
                  completed: progress,
                  total    : progress
                }
              } else {
                let progress = v.progress.split('/').map((e) => {
                  let v = parseInt(e);
                  return isNaN(v) ? null : v;
                });
                v.progress = {
                  completed: progress[0],
                  total    : progress[1]
                }
              }
              list.push(v);
            });
            return;
          }
          let href = tds[1].querySelector('a[class="animetitle"]').getAttribute('href');
          animes.push({
            id      : parseInt(/^\/anime\/(\d+)/i.exec(href)[1]),
            title   : getNodeText(tds[1].querySelector('span')),
            score   : function(){
                        let v = getNodeText(tds[2]);
                        return v === '-' ? null : v;
                      }(),
            type    : getNodeText(tds[3]),
            progress: getNodeText(tds[4]), // Processed in Summary
            rating  : getNodeText(tds[5]),
            start   : function(){
                        let v = getNodeText(tds[6]);
                        return v === '' ? null : v;
                      }(),
            finish   : function(){
                        let v = getNodeText(tds[7]);
                        return v === '' ? null : v;
                      }(),
          });
        }
        tr = tr.nextElementSibling;
      }
    }); 
    let content = document.getElementById('content');
    //content.style['white-space'] = 'pre';
    //content.innerText = JSON.stringify(list, null, 2);
    let minW = 1000;
    let minH = 1000;
    let css = document.createElement('style');
    content.insertAdjacentElement('afterend', css);
    list.forEach((anime) => {
      fetch('https://us-central1-lostofthought-com.cloudfunctions.net/cors?url='
        + encodeURIComponent('https://myanimelist.net/anime/' + anime.id )
      ).then( (response) => { return response.text(); } ).then( (response) => {
        let remote = document.createElement('div');
        remote.innerHTML = /<div id="contentWrapper"[^>]+>(.*)<!-- end of contentWrapper -->/s.exec(response)[1];
        anime.title = {
          original: anime.title,
          english : document.evaluate(
            '//span[contains(text(),"English")]/following-sibling::text()',
            remote, null, XPathResult.STRING_TYPE).stringValue.trim(),
          japanese: document.evaluate(
            '//span[contains(text(),"Japanese")]/following-sibling::text()',
            remote, null, XPathResult.STRING_TYPE).stringValue.trim(),
          synonyms: document.evaluate(
            '//span[contains(text(),"Japanese")]/following-sibling::text()',
            remote, null, XPathResult.STRING_TYPE).stringValue.trim()
        };
        console.log(anime);
        let elem = document.createElement('div');
        elem.classList.add('info_block');
        if(anime.rating === 'Rx'){
          elem.classList.add('adult');
        }
        let image = document.createElement('img');
        image.src = remote.querySelector('img[itemprop="image"]').getAttribute('src');
        image.onload = () => {
          minW = (minW > image.naturalWidth ? image.naturalWidth : minW);
          minH = (minH > image.naturalHeight ? image.naturalHeight : minH);
          css.innerHTML = '.info_block { width: ' + minW + 'px; height: ' + minH + 'px; overflow: hidden} #content > * { flex: 0 1 auto }'
        };
        //elem.insertAdjacentElement('beforeend', image);
        elem.setAttribute('style', 'background-image: url("' + image.src + '");');
        let title = document.createElement('h3');
        title.textContent = anime.title.english || anime.title.original;
        title.onclick = () => {
          window.location.href = 'https://myanimelist.net/anime/' + anime.id;
        }
        elem.insertAdjacentElement('beforeend', title);
        switch(anime.status){
          case 'completed': elem.classList.add('completed'); break;
          case 'cw': elem.classList.add('watching'); break;
          case 'ptw': elem.classList.add('planToWatch'); break;
        }
        content.insertAdjacentElement('beforeend', elem);
      });
    });
  });
}
