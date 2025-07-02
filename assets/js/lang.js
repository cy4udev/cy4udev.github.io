function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

var langmodal = true;
function showlangmodal() {
    if (!langmodal) {
      
      $('.header__search-modal').addClass('modal--is-visible');
        langmodal = true;
    }

    // Bu satır ile modal penceresini gösterin.
    $('#languageModal').modal('show');
}

function changelangtoTR()
{

    $( ".langEN" ).hide();
    $( ".langTR" ).show();
     // Modal'ı kapat
     $(".header__search-modal").removeClass("modal--is-visible");
}
function changelangtoEN()
{
    $( ".langTR" ).hide();
    $( ".langEN" ).show();
     // Modal'ı kapat
     $(".header__search-modal").removeClass("modal--is-visible");
}
function changetoTR(){if(!getCookie("lang")){$('.ui.modal.premiumfeatures').modal('show');}setCookie('lang','TR', 365);changelangtoTR();}
function changetoEN(){if(!getCookie("lang")){$('.ui.modal.premiumfeatures').modal('show');}setCookie('lang','EN', 365);changelangtoEN();}
$(document).ready(function() { 
  var lang = getCookie("lang");
  if (!lang) {
    changelangtoEN();
   // showlangmodal();
  }else if(lang == "TR")
  {
    changelangtoTR();
  }else{
    changelangtoEN();
  }
});