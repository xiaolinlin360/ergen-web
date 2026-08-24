/* ============================================================
   teach 工作区 · 测验组件 quiz.js
   在页面上自动增强 .quiz 块,实现即时反馈环:
   点选后立刻标记对错、锁定选项、显示解释。
   用法:在页面中引入本脚本,然后用下面的结构写题:

   <div class="quiz" data-answer="B" data-explanation="...">
     <p class="q">题干</p>
     <ul class="options">
       <li><button data-key="A">选项 A</button></li>
       <li><button data-key="B">选项 B</button></li>
       ...
     </ul>
     <div class="feedback" aria-live="polite"></div>
   </div>

   要点:data-answer 是正确答案的 data-key;每题的选项应等长、
   等字数,不给用户任何格式线索。
   ============================================================ */

(function () {
  "use strict";

  var QUIZ_SELECTOR = ".quiz";
  var OPTION_SELECTOR = "button[data-key]";

  function explain(q) {
    var s = "";
    for (var i = 0; i < q.options.length; i++) {
      s += q.options[i].key;
    }
    return s;
  }

  document.addEventListener("DOMContentLoaded", function () {
    var quizzes = document.querySelectorAll(QUIZ_SELECTOR);
    Array.prototype.forEach.call(quizzes, function (quiz) {
      var answer = (quiz.getAttribute("data-answer") || "").trim().toUpperCase();
      var explanation = quiz.getAttribute("data-explanation") || "";
      var feedback = quiz.querySelector(".feedback");
      var options = Array.prototype.map.call(
        quiz.querySelectorAll(OPTION_SELECTOR),
        function (btn) {
          return { key: (btn.getAttribute("data-key") || "").trim().toUpperCase(), btn: btn };
        }
      );

      if (!feedback) return;

      options.forEach(function (opt) {
        opt.btn.addEventListener("click", function () {
          if (opt.btn.disabled) return;

          var correct = opt.key === answer;

          // 标记选中项
          opt.btn.classList.add(correct ? "correct" : "wrong");

          // 锁定所有选项
          options.forEach(function (o) { o.btn.disabled = true; });

          // 反馈文案
          var head = correct ? "<b class=\"good\">✓ 正确。</b> " : "<b class=\"bad\">✗ 不对。</b> ";
          var hint = correct ? "" : ("正确答案是 " + answer + "。 ");
          feedback.innerHTML = head + hint + explanation;
        });
      });
    });
  });
})();
