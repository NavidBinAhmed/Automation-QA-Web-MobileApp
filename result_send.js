const fetch = require('node-fetch');

const webhookURL = 'https://chat.googleapis.com/v1/spaces/AAAAg4BDWKQ/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=yvixgrt8-YVhtiFvg_C7TyARv0mksdPpUXjQwaLIez8%3D';

var data = "";

if(process.env.BITBUCKET_EXIT_CODE === '0') {
  data = JSON.stringify({
    'text': `PASSED ==> Branch: ${process.env.BITBUCKET_BRANCH} ==> Pipeline: step_name ==> ${process.env.BITBUCKET_GIT_HTTP_ORIGIN}/addon/pipelines/home#!/results/${process.env.BITBUCKET_BUILD_NUMBER}`,
  });
} else {
  data = JSON.stringify({
    'text': `FAILED ==> Branch: ${process.env.BITBUCKET_BRANCH} ==> Pipeline: step_name ==> ${process.env.BITBUCKET_GIT_HTTP_ORIGIN}/addon/pipelines/home#!/results/${process.env.BITBUCKET_BUILD_NUMBER}`,
  });
}

fetch(webhookURL, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
  body: data,
}).then((response) => {
  console.log(response);
});