<?php

date_default_timezone_set("America/New_York");
header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("X-Accel-Buffering: no");
header("Content-Type: text/event-stream");
header("Cache-Control: no-cache");

$counter = rand(1, 10);
while (true) {
  // Every second, send a "ping" event.

//   echo "event: ping\n";
  $curDate = date(DATE_ISO8601);
  echo 'data: {"time": "' . $curDate . '"}';
  echo "\n\n";

  // Send a simple message at random intervals.

  $counter--;

  if (!$counter) {
    echo 'data: This is a message at time ' . $curDate . "\n\n";
    $counter = rand(1, 10);
  }

  if (ob_get_contents()) {
      ob_end_flush();
  }
  flush();

  // Break the loop if the client aborted the connection (closed the page)

  if (connection_aborted()) break;

  sleep(1);
}


    // header("Content-Type: application/event-stream; charset=UTF-8");
    // header("Cache-Control: No-Cache");
    // // header("Cache-Control: No-Store");
    // require_once "./va1/lib.php";
    // // $endpoints = array();
    // $endpoints_get = array();
    // $endpoints_post = array();

    // $vquery =  "select coalesce(id,'') as id, coalesce(chid,'UAH') as chid, shop, amnt, turndbt, turncdt, tm, acntno, '' as scancode, coalesce(vk_currency.sortorder,'0') cuso, coalesce(vk_shop.sortorder,'99') shso "
    // ."from vk_acntst join vk_currency on(id=atclcode) left join vk_shop on(vk_acntst.shop=vk_shop.code) "
    // ."where (abs(amnt)>0.0000001 or substr(now(),1,10)=substr(tm,1,10)) and (shop='CITY' or shop='FEYA' or shop='EKSV' or shop='BULK');";

    // while (true) {
    //     // echo "event: sendData\n\n";
    //     echo 'data: ' .json_encode(sqlReq($vquery)). "\n\n";

    //     ob_end_flush();
    //     flush();
    //     if (connection_aborted()) {
    //         break;
    //     };

    //     sleep(10);
    // }

?>
