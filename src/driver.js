// const PATH_TO_SERVER = "http://localhost/api/v2"; // for local testings
const PATH_TO_SERVER = "/api/v2"; // for deployment

/**
 * payload
 * @param {*} t token
 * @returns payload
 */
function pld(t) {
  if (t == undefined || t == "") {
    return { crntuser: "", term: "", role: "", user: "" }; // payload
  } else {
    return JSON.parse(window.atob(t.split(".")[1])); // payload
  }
}

/**
 *
 * @param {*} path
 * @param {*} token
 * @param {*} jdata
 * @returns
 */
const postFetch = async (path, token, jdata) => {
  const resp = fetch(`${PATH_TO_SERVER}${path}?api_token=${token}`, {
    method: "post",
    mode: "cors",
    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    body: "data=" + JSON.stringify(jdata),
    // body: `key=${MN_SID}&usr=${CRNTUSER.name}&query=${vquery}`,
  });
  return resp;
};

/**
 *
 * @param {*} path
 * @param {*} token
 * @param {*} jdata
 * @param {*} callback for success
 * @param {*} error callback fo error
 */
const postData = async (path, token, jdata, callback, error) => {
  // console.log("postData started" + JSON.stringify(data));
  // return;
  fetch(`${PATH_TO_SERVER}${path}?api_token=${token}`, {
    method: "post",
    mode: "cors",
    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    body: "data=" + JSON.stringify(jdata),
    // body: `key=${MN_SID}&usr=${CRNTUSER.name}&query=${vquery}`,
  })
    .then((resp) => resp.json())
    .then((jresp) => {
      callback(jresp.rslt);
      error(null);
    })
    .catch((err) => {
      error(err.message);
    });
};

/**
 *
 * @param {string} path
 * @param {string} jdata
 * @returns JSON
 */
const getFetch = async (path, jdata) => {
  if (jdata !== undefined && jdata !== "") {
    jdata = "?" + jdata;
  }
  const resp = fetch(`${PATH_TO_SERVER}${path}${jdata}`, {
    method: "get",
    mode: "cors",
    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
  });
  return resp;
};
/**
 *
 * @param {string} path
 * @param {string} query
 * @param {*} callback for success
 * @param {*} error callback fo error
 */
const getData = async (path, query, callback, error) => {
  if (query !== undefined && query !== "") {
    query = "?" + query;
  }
  fetch(`${PATH_TO_SERVER}${path}${query}`, {
    method: "get",
    mode: "cors",
    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
  })
    .then((resp) => resp.json())
    .then((jresp) => {
      callback(jresp.rslt);
      error(null);
    })
    .catch((err) => {
      error(err.message);
    });
};

/**
 *
 * @param {string} usr JSON base64 encoded
 * @returns JSON response
 */
function authFetch(usr) {
  const resp = fetch(`${PATH_TO_SERVER}/auth/index.php`, {
    method: "post",
    mode: "cors",
    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    body: `data=${usr}`,
  });
  return resp;
}

/**
 *
 * @param {string} raw
 * @returns JSON | false
 */
function parse(raw) {
  try {
    return JSON.parse(raw);
  } catch (err) {
    return false;
  }
}

export { pld, postFetch, getFetch, authFetch, parse, getData, postData };
