$(document).ready(() => {
  const $body = $('body');
  $body.html('');
  window.visitor = window.prompt("Enter your username: ") || "Anonymous";
  if (window.visitor === 'Anonymous'){
    alert('Your username has been set to "@Anonymous"')
  }
  streams.users[window.visitor] = [];
  const $h2 = $('<h1></h1>')
    .text('Twiddler!')
    .prependTo($body)
    .css('color', 'white');
  //FILTER TWEETS FUNCTION
  let filt = null;
  const $filterTweets = function(){
    return streams.home.filter(function(tweet){
      if (tweet.user === filt){
        return tweet;
      }
    }).map(function(tweet){
      const $tweet = $('<div></div>')
        .addClass('tweet')
        .css('color', 'white')
        .css('border-style', 'inset')
        .css('padding', '1');
      const $user = $('<div></div>')
        .addClass('user')
        .css('color', 'white')
        .css('font-weight', 'bold');
      $user.text(`@${tweet.user}`);
      const text = `"${tweet.message}", ${moment(tweet.created_at).fromNow()}`;
      $tweet.prependTo($tweet).text(text);
      $user.prependTo($tweet);
      //CLICK EVENT TO FILTER BY USER
      $($user).click(function(event){
        filt = $(event.target).text().slice(1);
        $('.tweet').remove();
        $body.append($filterTweets().reverse());
      });
      return $tweet;
    })
  };
  //UPDATE TWEETS FUNCTION
  const $updateTweets = function(){
    return streams.home.map((tweet) => {
      const $tweet = $('<div></div>')
        .addClass('tweet')
        .css('color', 'white')
        .css('border-style', 'inset')
        .css('padding', '1');
      const $user = $('<div></div>')
        .addClass('user')
        .css('color', 'white')
        .css('font-weight', 'bold');
      $user.text(`@${tweet.user}`);
      const text = `"${tweet.message}", ${moment(tweet.created_at).fromNow()}`;
      $tweet.prependTo($tweet).text(text);
      $user.prependTo($tweet);
      //CLICK EVENT TO FILTER BY USER
      $($user).click(function(event){
        filt = $(event.target).text().slice(1);
        $('.tweet').remove();
        $body.append($filterTweets().reverse());
      });
      return $tweet;
    })
  };
  
  //Attaching tweets to body and CSS
  $body
    .append($updateTweets().reverse())
    .css('background', 'rgb(36, 52, 71)')
    .css('font-family', 'Arial');
  
  //HOME BUTTON SETUP and CSS
  $('<button/>')
    .text('Home')
    .addClass('home-button')
    .click(function () {
      $('.tweet').remove();
      $body.append($updateTweets().reverse());
    })
    .insertAfter($h2)
    .css('background', 'rgb(29, 155, 240)')
    .css('font-weight', 'bold')
    .css('color', 'white')
    .css('border-radius', '30px')
    .css('height', '40px')
    .css('width', '80px')
  //TWEET BUTTON SETUP and CSS
  $('<button/>')
    .text('Tweet')
    .click(function () {
      let twid = window.prompt("Enter your message: ");
      if(twid)writeTweet(twid);
      $('.tweet').remove();
      $body.append($updateTweets().reverse());
    })
    .insertAfter('.home-button')
    .addClass('tweet-button')
    .css('background', 'rgb(29, 155, 240)')
    .css('font-weight', 'bold')
    .css('color', 'white')
    .css('border-radius', '30px')
    .css('height', '40px')
    .css('width', '80px')
});
