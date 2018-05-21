var chipsInstance = M.Chips.init($(".chips"), {
    secondaryPlaceholder: "+ Adicionar dado"
});

var sideNavInstance = M.Sidenav.init($(".sidenav"));
var tooltipsInstance = M.Tooltip.init($(".tooltipped"));
var collapsibleInstance = M.Collapsible.init($(".collapsible"));

var elems = document.querySelectorAll("select");
var instances = M.FormSelect.init(elems);