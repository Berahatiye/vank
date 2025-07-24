
const slider = document.getElementById('slider');
const track = slider.querySelector('.slider-track');
const dots = slider.querySelectorAll('.dot');
const totalSlides = dots.length;

let index = 0;
let isDragging = false;
let startX = 0;
let currentX = 0;

function setSlide(i) {
  index = i;
  track.style.transition = 'transform 0.5s ease-in-out';
  track.style.transform = `translateX(-${index * 100}%)`;
  dots.forEach(dot => dot.classList.remove('active'));
  if (dots[index]) dots[index].classList.add('active');
}

function onStart(x) {
  isDragging = true;
  startX = x;
  currentX = x;
  track.classList.add('dragging');
  track.style.transition = 'none';
}

function onMove(x) {
  if (!isDragging) return;
  currentX = x;
  const dx = currentX - startX;
  const percent = (dx / slider.offsetWidth) * 100;
  track.style.transform = `translateX(calc(-${index * 100}% + ${percent}%))`;
}

function onEnd() {
  if (!isDragging) return;
  const dx = currentX - startX;
  track.classList.remove('dragging');
  if (dx < -50 && index < totalSlides - 1) index++;
  else if (dx > 50 && index > 0) index--;
  setSlide(index);
  isDragging = false;
}

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    setSlide(i);
  });
});

slider.addEventListener('touchstart', e => onStart(e.touches[0].clientX), { passive: true });
slider.addEventListener('touchmove', e => onMove(e.touches[0].clientX), { passive: true });
slider.addEventListener('touchend', onEnd);

slider.addEventListener('mousedown', e => { e.preventDefault(); onStart(e.clientX); });
slider.addEventListener('mousemove', e => { if (isDragging) onMove(e.clientX); });
slider.addEventListener('mouseup', onEnd);
slider.addEventListener('mouseleave', onEnd);

slider.querySelectorAll('img').forEach(img => img.addEventListener('dragstart', e => e.preventDefault()));


function scrollToSection(elementId) {
    const element = document.getElementById(elementId);
    console.log("Element ID:", elementId);
    console.log("Found element:", element); // This will show null if not found
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        console.warn("Element with ID '" + elementId + "' not found.");
    }
}




          const scrollBtnContainer = document.getElementById('scrollBtnContainer');
        const scrollButton = document.querySelector('.scroll-top-button');
        const progressBarCircle = document.querySelector('.progress-ring');
        let radius, circumference;

        function updateCircleDimensions() {
            const svgEl = progressBarCircle.closest('svg');
            const svgWidth = svgEl.clientWidth;
            const strokeWidth = parseFloat(getComputedStyle(progressBarCircle).strokeWidth);
            radius = (svgWidth - strokeWidth) / 2;

            const trackCircle = document.querySelector('.progress-ring-track');
            progressBarCircle.setAttribute('r', radius);
            progressBarCircle.setAttribute('cx', svgWidth / 2);
            progressBarCircle.setAttribute('cy', svgWidth / 2);
            trackCircle.setAttribute('r', radius);
            trackCircle.setAttribute('cx', svgWidth / 2);
            trackCircle.setAttribute('cy', svgWidth / 2);

            circumference = 2 * Math.PI * radius;
            progressBarCircle.style.strokeDasharray = `${circumference} ${circumference}`;
        }

        function updateScrollProgress() {
            updateCircleDimensions();

            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight;
            const clientHeight = document.documentElement.clientHeight;
            const maxScrollTop = scrollHeight - clientHeight;

            let scrollPercentage = 0;
            if (maxScrollTop > 0) {
                scrollPercentage = (scrollTop / maxScrollTop) * 100;
            } else {
                scrollPercentage = 100;
            }

            scrollPercentage = Math.max(0, Math.min(100, scrollPercentage));

            const offset = circumference - (scrollPercentage / 100) * circumference;
            progressBarCircle.style.strokeDashoffset = offset;

            if (scrollTop > 200 && maxScrollTop > 0) {
                scrollBtnContainer.classList.add('show');
            } else {
                scrollBtnContainer.classList.remove('show');
            }
        }

        function scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            scrollButton.classList.add('interacted');
            setTimeout(() => {
                scrollButton.classList.remove('interacted');
            }, 500);
        }


        document.addEventListener('DOMContentLoaded', updateScrollProgress);
        window.addEventListener('scroll', updateScrollProgress);
        window.addEventListener('resize', updateScrollProgress);




  document.addEventListener('gesturestart', function (e) {
      e.preventDefault();
    });


    window.addEventListener('wheel', function (e) {
      if (e.ctrlKey) {
        e.preventDefault();
      }
    }, { passive: false });


    window.addEventListener('keydown', function (e) {
      if ((e.ctrlKey || e.metaKey) && (e.key === '+' || e.key === '-' || e.key === '=')) {
        e.preventDefault();
      }
    });



  const popupOverlay = document.getElementById('popupContainerMain');
  const popupOverlayContent = popupOverlay.querySelector('.popupOverlay-content');
  const popupBasketPanel = document.getElementById('popupBasketPanel');
  const popupBasketItems = document.getElementById('popupBasketItems');
  const popupBasketCount = document.getElementById('popupBasketCount');
  const products = document.querySelectorAll('.popupProductItem');
  const customProductionForm = document.getElementById('customProductionForm');
  const popupProductList = document.getElementById('popupProductList');
  const productDetailsPopup = document.getElementById('productDetailsPopup');
  const productDetailsImageMain = document.getElementById('productDetailsImageMain'); 
  const productDetailsImageMainWrapper = document.getElementById('productDetailsImageMainWrapper'); // New element
  const productDetailsImageGallery = document.getElementById('productDetailsImageGallery'); 
  const productDetailsCode = document.getElementById('productDetailsCode');
  const customMessageBox = document.getElementById('customMessageBox');
  const customMessageBoxText = document.getElementById('customMessageBoxText');
  const popupAddNotice = document.getElementById('popupAddNotice'); 


  let basketData = {}

  function showMessageBox(message) {
      customMessageBoxText.textContent = message;
      customMessageBox.classList.add('show');
      
      
      customMessageBox.querySelector('.custom-message-box-content').style.opacity = '1';
      customMessageBox.querySelector('.custom-message-box-content').style.transform = 'translateY(0)';
  }

  function hideMessageBox() {
      customMessageBox.querySelector('.custom-message-box-content').style.opacity = '0';
      customMessageBox.querySelector('div').style.transform = 'translateY(-20px)';
      setTimeout(() => {
          customMessageBox.classList.remove('show');
      }, 300);
  }

  function launchPopup() {
    popupOverlay.classList.add('show');
    setTimeout(() => {
      popupOverlayContent.style.visibility = 'visible';
      popupOverlayContent.style.opacity = '1';
      popupOverlayContent.style.transform = 'translateY(0)';
      activateCategoryTab('Çanta');
    }, 10);
  }

  function dismissPopup() {
    popupOverlayContent.style.opacity = '0';
    popupOverlayContent.style.transform = 'translateY(20px)';
    hideBasketPanel();
    hideProductDetails();

    setTimeout(() => {
      popupOverlay.classList.remove('show');
      popupOverlayContent.style.visibility = 'hidden';
      popupOverlayContent.scrollTop = 0;
    }, 300);
  }

  function activateCategoryTab(category) {
    
    document.querySelectorAll('.popupCategoryTabs button').forEach(btn => {
      btn.classList.remove('selected');
    });

    
    const selectedButton = Array.from(document.querySelectorAll('.popupCategoryTabs button')).find(btn => {
        if (category === 'SeriSonu' && btn.textContent.includes('Seri Sonu')) {
            return true;
        }
        if (category === 'CeketMont' && btn.textContent.includes('Ceket/Mont')) {
            return true;
        }
        
        return btn.textContent.trim() === category;
    });

    if (selectedButton) {
      selectedButton.classList.add('selected');
    }

    
    products.forEach(p => {
        p.classList.remove('popupVisible');
        p.style.display = 'none'; 
    });
    customProductionForm.classList.remove('popupVisible');
    customProductionForm.style.display = 'none';

    popupProductList.classList.add('loading'); 

    
    
    
    setTimeout(() => {
        if (category === 'Özel Üretim Talebi') {
            customProductionForm.style.display = 'flex';
            setTimeout(() => customProductionForm.classList.add('popupVisible'), 50);
        } else {
            
            const productItemsToShow = Array.from(products).filter(p => p.dataset.category === category);

            productItemsToShow.forEach((p, index) => {
                p.style.display = 'flex'; 
                setTimeout(() => {
                    p.classList.add('popupVisible'); 
                }, 50 + (index * 70)); 
            });
        }
        popupProductList.classList.remove('loading'); 
    }, 50); 
  }

  function addItemToBasket(code) {
    
    popupAddNotice.style.display = 'block';
    popupAddNotice.style.opacity = '1';
    setTimeout(() => {
        popupAddNotice.style.opacity = '0';
        setTimeout(() => popupAddNotice.style.display = 'none', 300);
    }, 1200);

    basketData[code] = (basketData[code] || 0) + 1;
    updateBasketDisplay();
  }

  function updateBasketDisplay() {
    const total = Object.values(basketData).reduce((a, b) => a + b, 0);
    popupBasketCount.textContent = total;
    popupBasketItems.innerHTML = '';

    if (total === 0) {
      popupBasketItems.textContent = 'Sepetiniz boş.';
    } else {
      for (const [code, qty] of Object.entries(basketData)) {
        const item = document.createElement('div');
        const textSpan = document.createElement('span');
        textSpan.textContent = `${code} x ${qty}`;
        item.appendChild(textSpan);

        const delBtn = document.createElement('button');
        delBtn.textContent = 'Sepetten Çıkar';
        delBtn.onclick = (function(c) {
            return function() {
                if (--basketData[c] <= 0) {
                    delete basketData[c];
                }
                updateBasketDisplay();
            };
        })(code);
        item.appendChild(delBtn);
        popupBasketItems.appendChild(item);
      }
    }
  }

  function toggleBasketView() {
    if (Object.keys(basketData).length === 0) {
        showMessageBox('Sepetiniz boş.');
        return;
    }
    popupBasketPanel.classList.toggle('show');
    
    if (popupBasketPanel.classList.contains('show')) {
        popupBasketPanel.querySelector('div').style.opacity = '1';
        popupBasketPanel.querySelector('div').style.transform = 'translateY(0)';
    } else {
        popupBasketPanel.querySelector('div').style.opacity = '0';
        popupBasketPanel.querySelector('div').style.transform = 'translateY(-20px)';
    }
  }

  function hideBasketPanel() {
    popupBasketPanel.classList.remove('show');
    popupBasketPanel.querySelector('div').style.opacity = '0';
    popupBasketPanel.querySelector('div').style.transform = 'translateY(-20px)';
  }

  function submitOrderWhatsApp() {
    if (customProductionForm.classList.contains('popupVisible')) {
        submitCustomOrderWhatsApp();
        return;
    }

    if (Object.keys(basketData).length === 0) {
        showMessageBox('Sepetiniz boş.');
        return;
    }
    let msg = 'Merhaba, sipariş vermek istiyorum:%0A';
    for (const [code, qty] of Object.entries(basketData)) {
      msg += `${code} x ${qty}%0A`;
    }
    window.open(`https://wa.me/905059792823?text=${msg}`, '_blank');
    basketData = {};
    updateBasketDisplay();
    dismissPopup();
  }

  function submitCustomOrderWhatsApp() {
    const name = document.getElementById('customerName').value;
    const email = document.getElementById('customerEmail').value;
    const phone = document.getElementById('customerPhone').value;
    const details = document.getElementById('productionDetails').value;
    const notes = document.getElementById('additionalNotes').value;

    if (!name || !phone || !details) {
        showMessageBox('Lütfen adınızı, telefon numaranızı ve üretim detaylarını doldurunuz.');
        return;
    }

    let msg = `Özel Üretim Talebi:%0A` +
              `Adı Soyadı: ${name}%0A` +
              `Telefon: ${phone}%0A`;
    if (email) msg += `E-posta: ${email}%0A`;
    msg += `Detaylar: ${details}%0A`;
    if (notes) msg += `Ek Notlar: ${notes}%0A`;

    window.open(`https://wa.me/905059792823?text=${msg}`, '_blank');
    document.getElementById('customerName').value = '';
    document.getElementById('customerEmail').value = '';
    document.getElementById('customerPhone').value = '';
    document.getElementById('productionDetails').value = '';
    document.getElementById('additionalNotes').value = '';
    dismissPopup();
  }

  
  function showProductDetails(imageUrls, productCode) {
    productDetailsCode.textContent = productCode;
    productDetailsImageGallery.innerHTML = ''; 

    // Add loading class to wrapper and main image
    productDetailsImageMainWrapper.classList.add('loading');
    productDetailsImageMain.classList.add('loading');

    // Set main image source and handle load/error
    productDetailsImageMain.src = imageUrls[0];
    productDetailsImageMain.onload = () => {
        productDetailsImageMainWrapper.classList.remove('loading');
        productDetailsImageMain.classList.remove('loading');
    };
    productDetailsImageMain.onerror = function() {
        this.src = 'https://placehold.co/600x400/362828/f5f5f7?text=Image+Missing';
        productDetailsImageMainWrapper.classList.remove('loading');
        productDetailsImageMain.classList.remove('loading');
    };

    
    if (imageUrls.length > 1) {
        imageUrls.forEach((url, index) => {
            const thumbWrapper = document.createElement('div');
            thumbWrapper.classList.add('productDetailsImageGallery-item-wrapper');

            const thumbImg = document.createElement('img');
            thumbImg.src = url;
            thumbImg.alt = `Vank Deri ${productCode} Detay Görsel ${index + 1}`; 
            
            // Add loading class to thumbnail wrapper and image
            thumbWrapper.classList.add('loading');
            thumbImg.classList.add('loading');

            thumbImg.onload = () => {
                thumbWrapper.classList.remove('loading');
                thumbImg.classList.remove('loading');
            };
            thumbImg.onerror = function() {
                this.src = 'https://placehold.co/80x80/362828/f5f5f7?text=Thumb';
                thumbWrapper.classList.remove('loading');
                thumbImg.classList.remove('loading');
            };

            thumbWrapper.appendChild(thumbImg);

            thumbWrapper.addEventListener('click', () => {
                // Add loading class when changing main image
                productDetailsImageMainWrapper.classList.add('loading');
                productDetailsImageMain.classList.add('loading');
                productDetailsImageMain.src = url; 
                
                // Remove loading class once the new main image is loaded
                productDetailsImageMain.onload = () => {
                    productDetailsImageMainWrapper.classList.remove('loading');
                    productDetailsImageMain.classList.remove('loading');
                };
                productDetailsImageMain.onerror = () => {
                    productDetailsImageMainWrapper.classList.remove('loading');
                    productDetailsImageMain.classList.remove('loading');
                    productDetailsImageMain.src = 'https://placehold.co/600x400/362828/f5f5f7?text=Image+Missing'; // Fallback
                };

                Array.from(productDetailsImageGallery.children).forEach(wrapper => wrapper.classList.remove('active'));
                thumbWrapper.classList.add('active');
            });
            if (index === 0) {
                thumbWrapper.classList.add('active'); 
            }
            productDetailsImageGallery.appendChild(thumbWrapper);
        });
    }

    productDetailsPopup.classList.add('show');
    setTimeout(() => {
        productDetailsPopup.querySelector('.productDetailsPopupContent').style.opacity = '1';
        productDetailsPopup.querySelector('.productDetailsPopupContent').style.transform = 'scale(1)';
    }, 10);
  }

  function hideProductDetails() {
    productDetailsPopup.querySelector('.productDetailsPopupContent').style.opacity = '0';
    productDetailsPopup.querySelector('.productDetailsPopupContent').style.transform = 'scale(0.9)';
    setTimeout(() => {
        productDetailsPopup.classList.remove('show');
    }, 300);
  }


  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        dismissPopup();
        hideBasketPanel();
        hideProductDetails();
        hideMessageBox();
    }
  });

  const loadingOverlay = document.getElementById('loadingOverlay');
  const allImages = document.getElementsByTagName('img');
  let imagesLoaded = 0;
  let totalImagesToLoad = 0;

  Array.from(allImages).forEach(img => {
      if (!img.closest('.popupOverlay') && !img.closest('.productDetailsPopupOverlay')) {
          totalImagesToLoad++;
      }
  });


  function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded >= totalImagesToLoad) {
      hideFullScreenLoader();
    }
  }

  function hideFullScreenLoader() {
      loadingOverlay.style.opacity = '0';
      document.body.classList.add('loaded');
      setTimeout(() => {
        loadingOverlay.style.display = 'none';
      }, 500);
  }

  if (totalImagesToLoad === 0) {
      hideFullScreenLoader();
  } else {
    Array.from(allImages).forEach(img => {
        if (!img.closest('.popupOverlay') && !img.closest('.productDetailsPopupOverlay')) {
            if (img.complete) {
                imageLoaded();
            } else {
                img.addEventListener('load', imageLoaded);
                img.addEventListener('error', imageLoaded);
            }
        }
    });
  }











    function toggleContext(contextId) {

  const contexts = document.querySelectorAll('.line-text-wrapper');
  contexts.forEach(context => {
    if (context.id !== contextId) {
      context.classList.remove('show');
    }
  });


  const current = document.getElementById(contextId);
  current.classList.toggle('show');


  const button = document.querySelector(`[onclick="toggleContext('${contextId}')"]`);
  if (button) {
    button.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}