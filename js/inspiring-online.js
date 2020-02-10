/**
 * Inspiring Online
 * -- Simple client side rendering
 * -- And endless scroll
 */

var remoteAssetSource = "https://s3.amazonaws.com/inspiring.online/assets/post-images/";
var localAssetSource = "/assets/post-images/";
var splitString = "splitHERE"; // Surely there is a better way to get json data in jekyll?
var imageWidthInTile = 214; // 250 - padding - borders
var page = 1;
var loading = false;

var isotopeObject;
var loader;

const tileGrid = document.querySelector('.tile-grid');

function init() {
  cacheDom();
  createIsotopeContainer();
  renderInitialTile();

  if( typeof postJSON === "undefined" ) {
    $.ajax({
      url: '/',
      type: 'GET',
      success: function(data) {
        eval(data.split(splitString)[1]);
        renderPosts(postJSON);
        loader.className = "loader";
        loading = false;
        addPaginator();
      }
    })
  } else {
    renderPosts(postJSON);
    addPaginator();
  }
}

function cacheDom() {
  loader = document.querySelector('.loader');
}

function addPaginator() {
  // TODO: Wouldn't hurt to debounce this
  if ((window.innerHeight + window.scrollY) >= (document.body.scrollHeight - 50)) {
    paginate();
  }
  window.onscroll = function(e) {
    if ((window.innerHeight + window.scrollY) >= (document.body.scrollHeight - 50)) {
      paginate();
    }
  };
}

function paginate() {
  if( loading === true ) {
    return;
  }

  loading = true;
  loader.className = "loader loading";
  page++;

  $.ajax({
    url: '/' + page + '/',
    type: 'GET',
    success: function(data) {
      eval(data.split(splitString)[1]);
      renderPosts(postJSON);
      loader.className = "loader";
      loading = false;
    },
    error: function() {
      // Hide loader... but also, you're at the end of the page.
      renderFooterTile();
      loader.className = "loader";
    }
  })
}

function createIsotopeContainer() {
  var elem = tileGrid;
  isotopeObject = new Isotope( elem, {
    // options
    itemSelector: '.tile',
    masonry: {
      gutter: 30,
      fitWidth: true
    },
    sortBy: 'original-order',
    hiddenStyle: {
      // transform: 'translate(9px, 9px)',
      'opacity': 0
    },
    visibleStyle: {
      // transform: 'translate(0px, 0px)',
      opacity: 1
    }
  });
}

function renderInitialTile() {
  var element = document.createElement('div');
  // element.innerHTML = `
  //   <h1>Inspiring Online</h1>
  //   <h2>A micro blog of what&#700;s up online, today.</h2>
  //   <ul>
  //     <li><a href="https://github.com/tholman/inspiring-online/graphs/contributors">Contributors</a></li>
  //     <li><a href="https://github.com/tholman/inspiring-online#contributing">Join in?</a></li>
  //     <li><a href="https://twitter.com/NspiringOnline">Twitter</a></li>
  //     <li><a href="https://github.com/tholman/inspiring-online#inspiring-online">About</a></li>
  //     <li><a href="/feed.xml">RSS</a></li>
  //   </ul>`

  element.className = "tile"
  isotopeObject.insert(element);
}

function renderFooterTile() {
  var element = document.createElement('footer');
  element.innerHTML = `
    <footer>
      Wow, you got to the end! Got something to share, you should <a href="https://github.com/tholman/inspiring-online#contributing">consider contributing!</a>
    </footer>`
  document.querySelector('.content').appendChild(element);
}

function renderPosts(postsData) {
  for( var i = 0; i < postsData.length; i++ ) {
    renderPost(postsData[i]);
  }
}

function renderPost(postData) {
  if (postData.title.replace(/\s+/g, '-').replace(/[^a-z0-9+][^\w.-]/gi, '').toLowerCase() != window.location.pathname.replace(/\//g, '').toLowerCase()) {
    var element = document.createElement('div');
    element.className = 'tile';

    if( postData.image !== "" ) {

      var anchor = document.createElement('a');
      anchor.href = postData.link;

      var img = document.createElement('img');

      var src = "";
      if( postData.remoteAsset === "true" ) {
        src += remoteAssetSource;
      } else {
        src += localAssetSource;
      }

      var width = parseInt(postData.imgWidth);
      var height = parseInt(postData.imgHeight);

      var ratio = imageWidthInTile / width;
      var newWidth = imageWidthInTile;
      var newHeight = height * ratio;

      img.width = (newWidth);
      img.height = (newHeight);
      img.src = (src + postData.image);
      anchor.appendChild(img);
      element.appendChild(anchor);
    }

    var anchor2 = document.createElement('a');
    anchor2.href = postData.link;
    anchor2.className = "title-anchor";

    var title = document.createElement('h1');
    title.innerHTML = postData.title;
    if (postData.siteDown == "true") {
      element.className = 'tile site-down';
    }

    anchor2.appendChild(title);
    element.appendChild(anchor2);

    var content = document.createElement('div');
    content.innerHTML = postData.content;
    element.appendChild(content);

    isotopeObject.insert(element);
  }
}

tileGrid? init() : false;

function isObj(obj) {
  return (obj && typeof obj === 'object' && obj !== null) ? true : false;
}

function createEl(element = 'div') {
  return document.createElement(element);
}

function emptyEl(el) {
  while(el.firstChild)
  el.removeChild(el.firstChild);
}

function elem(selector, parent = document){
  let elem = isObj(parent) ? parent.querySelector(selector) : false;
  return elem ? elem : false;
}

function elems(selector, parent = document) {
  let elems = isObj(parent) ?parent.querySelectorAll(selector) : [];
  return elems.length ? elems : false;
}

function pushClass(el, targetClass) {
  if (isObj(el) && targetClass) {
    let elClass = el.classList;
    elClass.contains(targetClass) ? false : elClass.add(targetClass);
  }
}

function deleteClass(el, targetClass) {
  if (isObj(el) && targetClass) {
    let elClass = el.classList;
    elClass.contains(targetClass) ? elClass.remove(targetClass) : false;
  }
}

function modifyClass(el, targetClass) {
  if (isObj(el) && targetClass) {
    const elClass = el.classList;
    elClass.contains(targetClass) ? elClass.remove(targetClass) : elClass.add(targetClass);
  }
}

function containsClass(el, targetClass) {
  if (isObj(el) && targetClass && el !== document ) {
    return el.classList.contains(targetClass) ? true : false;
  }
}

function isChild(node, parentClass) {
  let objectsAreValid = isObj(node) && parentClass && typeof parentClass == 'string';
  return (objectsAreValid && node.closest(parentClass)) ? true : false;
}

function elemAttribute(elem, attr, value = null) {
  if (value) {
    elem.setAttribute(attr, value);
  } else {
    value = elem.getAttribute(attr);
    return value ? value : false;
  }
}

function customHelpers() {
  const sidebar = elem('.sidebar');
  const content = elem('.content');
  const togglerButton = elem('.sidebar-toggle');
  const pull = 'sidebar-pull';
  const page = document.documentElement;

  page.addEventListener('click', function(event){
    let isTogglerButton = event.target === togglerButton;

    if (isTogglerButton) {
      modifyClass(sidebar, pull);
      modifyClass(content, pull);
    }
  })
  
}

window.addEventListener('load', customHelpers());
