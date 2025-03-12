import { useEffect, useState, useRef } from 'react';
import './HeatGraph.css';
import CardHeading from '../dashboard/dashboardCards/CardHeading';
import { HeatmapSkeleton } from '../dashboard/repositories/CustomSkeletons';

const prettyNumber = (number) => (number < 10 ? `0${number}` : number);

const getDisplayDate = (dateObj) => {
  const prettyMonth = prettyNumber(dateObj.getMonth() + 1);
  const prettyDate = prettyNumber(dateObj.getDate());
  return `${dateObj.getFullYear()}-${prettyMonth}-${prettyDate}`;
};

const getColor = (count, colors) => {
  const ranges = [
    { min: 1, max: 10, color: colors[1] },
    { min: 11, max: 20, color: colors[2] },
    { min: 21, max: 30, color: colors[3] },
    { min: 31, max: 40, color: colors[4] },
    { min: 41, max: 50, color: colors[5] },
    { min: 51, max: 60, color: colors[6] },
    { min: 61, max: 70, color: colors[7] },
    { min: 71, max: 80, color: colors[8] },
    { min: 81, max: Infinity, color: colors[9] },
  ];

  const range = ranges.find(({ min, max }) => count >= min && count <= max);
  return range ? range.color : colors[0];
};

const HeatGraph = ({
  loading,
  headerContent,
  data,
  monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  hDays = ['M', 'W', 'F'],
  borderRadius = 2,
  onClick,
}) => {
  const [timestampData, setTimestampData] = useState({});
  const svgRef = useRef(null);
  const colors = ["#e0f0fe", "#a2d1fc", "#64b2fb", "#2693f9", "#2693f9", "#04539b", "#03325d", "#01111f"];
  useEffect(() => {
    const processListTimestamp = (listTimestamp) => {
      const objTimestamp = {};
      listTimestamp?.forEach((item) => {
        const _type = typeof item;
        const _d = _type === 'number' ? new Date(item) : new Date(item.date);
        const displayDate = getDisplayDate(_d);
        const increase = _type === 'number' ? 1 : item.commitCount;
        objTimestamp[displayDate] = objTimestamp[displayDate]
          ? objTimestamp[displayDate] + increase
          : increase;
      });
      setTimestampData(objTimestamp);
    };

    processListTimestamp(data);
  }, [data]);

  useEffect(() => {
    const createGraph = () => {
      const endDate = new Date();
      endDate.setHours(0, 0, 0, 0);

      const startDate = new Date(endDate);
      startDate.setDate(startDate.getDate() - 7 * 53);

      while (startDate.getDay() !== 0) {
        startDate.setDate(startDate.getDate() - 1);
      }

      let loopHtml = '';
      let week = 0;
      let gX = week * 13;
      let itemHtml = `<g transform="translate(${gX}, 0)">`;
      let usingMonth = startDate.getMonth();
      const monthPosition = [{ monthIndex: startDate.getMonth(), x: 0 }];

      while (startDate <= endDate) {
        const monthInDay = startDate.getMonth();
        const dataDate = getDisplayDate(startDate);
        const count = timestampData[dataDate] || 0;
        const color = getColor(count, colors);
        const y = startDate.getDay() * 13;

        if (startDate.getDay() === 0) {
          itemHtml = `<g transform="translate(${gX}, 0)">`;
        }

        itemHtml += `<rect class="day" width="11" height="11" y="${y}" fill="${color}" 
                      data-count="${count}" data-date="${dataDate}" rx="${borderRadius}" ry="${borderRadius}" />`;

        if (startDate.getDay() === 6 || startDate.getTime() === endDate.getTime()) {
          itemHtml += '</g>';
          loopHtml += itemHtml;
          itemHtml = '';

          week++;
          gX = week * 13;
        }

        if (startDate.getDay() === 0 && monthInDay !== usingMonth) {
          usingMonth = monthInDay;
          monthPosition.push({ monthIndex: usingMonth, x: gX });
        }

        startDate.setDate(startDate.getDate() + 1);
      }

      monthPosition.forEach((item) => {
        loopHtml += `<text x="${item.x}" y="-5" class="month" style="font-size: 8px; fill: grey;">${monthNames[item.monthIndex]}</text>`;
      });

      loopHtml += `
        <text text-anchor="middle" style="font-size: 8px; fill: grey;" class="wday" dx="-10" dy="22">${hDays[0]}</text>
        <text text-anchor="middle" style="font-size: 8px; fill: grey;" class="wday" dx="-10" dy="48">${hDays[1]}</text>
        <text text-anchor="middle" style="font-size: 8px; fill: grey;" class="wday" dx="-10" dy="74">${hDays[2]}</text>
      `;

      const wireHtml = `
        <svg width="100%" height="100%" viewBox="0 0 721 110" class="js-calendar-graph-svg">
          <g transform="translate(20, 20)">
            ${loopHtml}
          </g>
        </svg>
      `;

      svgRef.current.innerHTML = wireHtml;

      const dayElements = svgRef.current.querySelectorAll('.day');
      dayElements.forEach((day) => {
        day.addEventListener('click', () => {
          if (onClick) {
            onClick(day.getAttribute('data-date'), parseInt(day.getAttribute('data-count')));
          }
        });

        day.addEventListener('mouseenter', (e) => {
          const tooltip = document.querySelector('.svg-tip');
          const count = e.target.getAttribute('data-count');
          const date = e.target.getAttribute('data-date');
          const countText = count > 1 ? 'contributions' : 'contribution';
          tooltip.innerText = `${count} ${countText} on ${date}`;
          tooltip.style.display = 'block';
          const tooltipWidth = tooltip.offsetWidth / 2 + 5;
          const tooltipHeight = tooltip.offsetHeight * 2 + 10;
          tooltip.style.top = `${e.clientY - tooltipHeight - 5}px`;
          tooltip.style.left = `${e.clientX - tooltipWidth}px`;
        });

        day.addEventListener('mouseleave', () => {
          document.querySelector('.svg-tip').style.display = 'none';
        });
      });
    };

    createGraph();
  }, [timestampData, colors, monthNames, hDays, borderRadius, onClick]);

  return (
    <div className="shadow-md p-2 py-4 rounded-md border">
      {/* {loading ?
        <HeatmapSkeleton />
        : <> */}
          <CardHeading title={headerContent?.title} tooltipContent={headerContent?.toolTip} />
          <div ref={svgRef}></div>
          <div className="svg-tip" style={{ display: 'none' }}></div>
          <div className="w-full flex text-sm md:text-lg items-center text-[#71717A] justify-between pt-4 lg:px-8">
            <p></p>
            <div className="flex items-center gap-4">
              <p>Less</p>
              <div className="flex items-center gap-2">
                {colors?.map((color, index) => (
                  <div key={index} className="size-2 md:size-4 rounded-sm" style={{ backgroundColor: color }}></div>
                ))}
              </div>
            </div>
          </div>
        {/* </>
      } */}
    </div>

  );
};

export default HeatGraph;
