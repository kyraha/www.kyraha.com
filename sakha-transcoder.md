---
title: Транскодер якутских кодировок
layout: page
bodyClass: page-home
---

Скопируйте текст в неправильной якутской кодировке в окно конвертора и нажмите кнопку "Convert". Все символы из неправильной кодировки будут заменены на юникодовые (ҕҥөһү ҔҤӨҺҮ). Получившийся результат можно скопировать обратно для дальнейшего редактирования и/или публикации в Интернет.

Данный конвертор сам пытается определить, в какой из неправильных якутских кодировок закодирован текст. Но если Вы считаете, что кодировка определяется неправильно, то перед тем, как нажать на кнопку "Convert", выберите нужную кодировку источника.

  <script src="{{ '/js/sakha-transcoder.js' | relative_url }}"></script>
  <form name="uniconvert" method="get" action="">
    <input type="button" id="buttonConvert" value="Convert" onclick="convertText(this.form)" />
    <label for="enc0"><input type="radio" name="encodingNum" id="enc0" value="0" checked="1"/> Auto</label>
    <label for="enc1"><input type="radio" name="encodingNum" id="enc1" value="1" /> Times</label>
    <label for="enc2"><input type="radio" name="encodingNum" id="enc2" value="2" /> Yak</label>
    <label for="enc3"><input type="radio" name="encodingNum" id="enc3" value="3" /> Saxa</label>
    <label for="enc4"><input type="radio" name="encodingNum" id="enc4" value="4" /> Dabyl</label>
    <label for="enc5"><input type="radio" name="encodingNum" id="enc5" value="5" /> Lazurski</label>
    <br />
    <textarea id="bigText" style="width:100%;height:26em;"></textarea>
  </form>
  

