  var $links = $('[draggable="true"]');
  $links.each(function () {
    this.addEventListener('dragstart', function (e) {
      e.dataTransfer.effectAllowed = 'copy'; // only dropEffect='copy' will be dropable
      e.dataTransfer.setData('Text', this.id); // required otherwise doesn't work
    });
  });
  var $panels = $('.wf-container, .wf-subcontainer');
  $panels.each(function () {
    var panel = this;
    panel.addEventListener('dragover', function (e) {
      if (e.preventDefault) e.preventDefault(); // allows us to drop
      $(this).addClass('wf-over');
      e.dataTransfer.dropEffect = 'copy';
      return false;
    });

    // to get IE to work
    panel.addEventListener('dragenter', function (e) {
      if (e.stopPropagation) e.stopPropagation(); // stops the browser from redirecting...why???
      $(this).addClass('wf-over');
      return false;
    });

    panel.addEventListener('dragleave', function (e) {
      if (e.stopPropagation) e.stopPropagation(); // stops the browser from redirecting...why???
      $(this).removeClass('wf-over');
    });

    panel.addEventListener('drop', function (e) {
      if (e.stopPropagation) e.stopPropagation(); // stops the browser from redirecting...why???
      var el = document.getElementById(e.dataTransfer.getData('Text'));
      
      el.parentNode.removeChild(el);

      // stupid nom text + fade effect
      $(".wf-over").removeClass('wf-over');
      panel.appendChild(el);

      return false;
    });
  });

