module.exports = function(doodlePollUrl) {

  function loadDoodle() {
    if (!browser.getCurrentUrl().startsWith(doodlePollUrl)) {
      browser.configure().window().maximize();
      browser.get(doodlePollUrl);
    }
  }

  return {
    closestDate: function() {
      loadDoodle();
      tabSwitcher.switchToCalendar();
      var today = calendar.today();
      tabSwitcher.switchToTable();
      return table.closestDateTo(today);
    },
    participantsFor: function(date) {
      loadDoodle();
      tabSwitcher.switchToTable();
      return table.participantsFor(date);
    },
    participantsForClosestDate: function() {
      return this.participantsFor(this.closestDate());
    }
  };
};

var table = (function() {
  var elems = { root: $("#d-pollView") };
  elems.dates = elems.root.find(".d-optionDate");
  elems.months = elems.dates.find(".d-month");
  elems.days = elems.dates.find(".d-date");
  elems.preferences = elems.root.find(".d-preference");
  elems.checkedPreferences = elems.preferences.has(".d-yesPreference");
  elems.participants = elems.root.find(".d-participant");

  function dateElemAfter($date) {
    return elems.dates.rightOf($date).first();
  }

  function dateElemsOfMonth(month) {
    return elems.dates.has(elems.months.withText(month));
  }

  function participantElemsFor($date) {
    var $checkedPreferences = elems.checkedPreferences.below($date);
    return elems.participants.leftOf($checkedPreferences);
  }

  function dateToDateElem(date) {
    return dateElemsOfMonth(date.month).has(elems.days.withText(date.day));
  }

  function dateElemToDate($date) {
    return {
      day: parseInt($date.find(elems.days).text()),
      month: $date.find(elems.months).text()
    };
  }

  return {
    closestDateTo: function(date) {
      var $firstDateOfTheMonth = dateElemsOfMonth(date.month).first(),
          closestDate = dateElemToDate($firstDateOfTheMonth);

      for (var $nextDate = dateElemAfter($firstDateOfTheMonth);
           closestDate.day < date.day && closestDate.month == date.month;
           closestDate = dateElemToDate($nextDate), $nextDate = dateElemAfter($nextDate));

      return closestDate;
    },
    participantsFor: function(date) {
      var participants = [];

      for (var i = 0, $participants = participantElemsFor(dateToDateElem(date));
           i < $participants.size();
           participants.push($participants.eq(i++).text().trim()));

      return participants;
    }
  };
})();

var calendar = (function() {
  var elems = { root: $("#d-participationWeekView") };
  elems.week = elems.root.find(".d-weekTitle");
  elems.nextWeekButton = elems.root.find(".d-nextWeek");
  elems.days = elems.root.find(".fc-day-header");
  elems.today = elems.days.filter(".fc-today");
  elems.daysOfMonth = elems.days.find("span:first");

  return {
    today: function() {
      var today = {};

      while (!elems.today.checkForExistence("immediate")) elems.nextWeekButton.click();
      today.day = elems.today.find(elems.daysOfMonth).text();

      var possibleMonths = elems.week.text().match('[a-zA-Z]{3}', 'g');
      today.month = possibleMonths[possibleMonths.length == 2 && today.day < 7 ? 1 : 0];

      return today;
    }
  };
})();

var tabSwitcher = (function() {
  var elems = { tabSelectors: $(".d-tabSwitcherContainer").find("a") };
  elems.calendarSelector = elems.tabSelectors.withAttr("href", "#calendar");
  elems.tableSelector = elems.tabSelectors.withAttr("href", "#table");

  return {
    switchToCalendar: function() {
      elems.calendarSelector.click();
    },
    switchToTable: function() {
      elems.tableSelector.click();
    }
  };
})();
