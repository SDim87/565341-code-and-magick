'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var PADDING = 30;
var FONT_GAP = 16;
var BAR_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var WHITE = '#fff';
var BLACK = '#000';
var SHADOW = 'rgba(0, 0, 0, 0.7)';
var RED = 'rgba(255, 0, 0, 1)';
var minOpacity = 0.3;
var maxOpacity = 0.9;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var getRandomOpacity = function (min, max) {
  var opacity = Math.random() * (max - min) + min;

  return 'rgba(0, 0, 255, ' + opacity + ')';
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, SHADOW);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, WHITE);

  ctx.fillStyle = BLACK;
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура, вы победили!', CLOUD_X + PADDING, CLOUD_Y + PADDING);
  ctx.fillText('Список результатов:', CLOUD_X + PADDING, CLOUD_Y + PADDING + FONT_GAP);

  var maxTime = getMaxElement(times);

  for (var j = 0; j < names.length; j++) {

    if (names[j] === 'Вы') {
      ctx.fillStyle = RED;
    } else {
      ctx.fillStyle = getRandomOpacity(minOpacity, maxOpacity);
    }

    ctx.fillText(names[j], CLOUD_X + GAP + PADDING + (BAR_WIDTH + BAR_GAP) * j, CLOUD_HEIGHT - GAP);
    ctx.fillText(Math.round(times[j]), CLOUD_X + GAP + PADDING + (BAR_WIDTH + BAR_GAP) * j, CLOUD_HEIGHT - PADDING - GAP - ((BAR_HEIGHT * times[j]) / maxTime));
    ctx.fillRect(CLOUD_X + GAP + PADDING + (BAR_WIDTH + BAR_GAP) * j, CLOUD_HEIGHT - PADDING - ((BAR_HEIGHT * times[j]) / maxTime), BAR_WIDTH, (BAR_HEIGHT * times[j]) / maxTime);
  }
};
