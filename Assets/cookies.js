// to set a Cookie
  function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  
// to set a Cookies' value
  function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  // to check if a cookie exists!
  
  function checkCookie(key) {
    let fetchvalue = getCookie(key);
    if (fetchvalue != "") {
      console.log(key + "=" + fetchvalue +  " found in Cookies!");
    } else {
        console.log(key + " Cookie Not Found!");
    }
  }

// too delete a cookie
  function delCookie(cname) {
    document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
  }


// to list and table the cookies of page
function tableCookies() {
  const cookies = document.cookie.split(";");

  const table = [];

  cookies.forEach(cookie => {
      cookie = cookie.trim();

      if (cookie === "") return;

      const separatorIndex = cookie.indexOf("=");

      const name = cookie.substring(0, separatorIndex);
      const value = cookie.substring(separatorIndex + 1);

      table.push({
          Name: name,
          Value: value
      });
  });
  
  console.table(table);
}

// to delete all the set of cookies
  function delAllCookies() {
    document.cookie.split(";").forEach(function(cookie) {
      const name = cookie.split("=")[0].trim();
      if (name) {
        delCookie(name);
      }
    });
  }