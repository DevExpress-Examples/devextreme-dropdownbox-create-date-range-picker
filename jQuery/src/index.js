$(() => {
    let startDate = new Date(2022, 5, 18);
    let endDate = new Date(2022, 5, 23);

    $("#dateRangeBox").dxDropDownBox({
        value: [startDate, endDate],
        onValueChanged({ value }) {
            startDate = value[0];
            endDate = value[1];

            updateInfo();
        },
        dropDownOptions: {
            width: 'auto'
        },
        fieldTemplate(value, fieldElement) {
            const formatDate = DevExpress.localization.formatDate;
            const format = "shortDate";
            const formattedText = value.map(value => formatDate(value, format)).join(" - ");

            const textBox = $("<div>").dxTextBox({
                readOnly: true,
                value: formattedText,
            });

            fieldElement.append(textBox);
        },
        contentTemplate({ component }) {
            const dropDownBox = component;
            let dateRange = dropDownBox.option("value");

            const $calendar = $("<div>").dxCalendar({
                value: dateRange[dateRange.length - 1],
                cellTemplate(cellInfo, index, container) {
                    const cellDate = cellInfo.date;
                    dateRange = dropDownBox.option("value");

                    if (cellDate >= dateRange[0] && cellDate <= dateRange[1]) {
                        container.addClass("dx-calendar-selected-date");
                    }

                    return $("<span>").text(cellInfo.text);;
                },
                onValueChanged({ component, value }) {
                    const calendar = component;
                    dateRange = dropDownBox.option("value");
                    
                    if (dateRange.length >= 2 || value < dateRange[0]) dateRange = [];

                    dateRange.push(value);
                    dropDownBox.option("value", dateRange);

                    calendar.repaint();
                    calendar.focus();

                    if (dateRange.length == 2) {
                        dropDownBox.close();
                        dropDownBox.focus();
                    }
                },
            });

            return $calendar;
        },
    })

    function updateInfo() {
        $("#start").html(startDate || "");
        $("#end").html(endDate || "");
    }

    updateInfo();
});