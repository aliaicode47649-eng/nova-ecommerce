/**
 * NOVA — Interactive Size Guide & Fit Assistant
 * Multi-category conversion tables, cm/inch unit toggler & smart size calculator
 */

class SizeGuideManager {
  constructor() {
    this.unit = 'cm'; // 'cm' or 'inch'
    this.activeCategory = 'women';
  }

  init() {
    this.bindUnitSwitch();
    this.bindTabs();
    this.bindCalculator();
    this.renderActiveTable();
  }

  bindUnitSwitch() {
    const cmBtn = document.getElementById('unit-btn-cm');
    const inBtn = document.getElementById('unit-btn-inch');

    if (cmBtn && inBtn) {
      cmBtn.addEventListener('click', () => {
        this.unit = 'cm';
        cmBtn.classList.add('active');
        inBtn.classList.remove('active');
        this.renderActiveTable();
      });

      inBtn.addEventListener('click', () => {
        this.unit = 'inch';
        inBtn.classList.add('active');
        cmBtn.classList.remove('active');
        this.renderActiveTable();
      });
    }
  }

  bindTabs() {
    const tabBtns = document.querySelectorAll('.size-tab-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.activeCategory = btn.getAttribute('data-tab') || 'women';
        this.renderActiveTable();
      });
    });
  }

  formatMeasurement(cmVal) {
    if (this.unit === 'cm') {
      return `${cmVal} cm`;
    } else {
      const inchVal = (cmVal / 2.54).toFixed(1);
      return `${inchVal} in`;
    }
  }

  renderActiveTable() {
    const tableContainer = document.getElementById('size-table-container');
    if (!tableContainer) return;

    if (this.activeCategory === 'women') {
      tableContainer.innerHTML = `
        <table class="size-table">
          <thead>
            <tr>
              <th>سایز استاندارد</th>
              <th>ایران / اروپا (EU)</th>
              <th>آمریکا (US)</th>
              <th>انگلستان (UK)</th>
              <th>دور سینه (${this.unit})</th>
              <th>دور کمر (${this.unit})</th>
              <th>دور باسن (${this.unit})</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>XS</strong></td>
              <td>34</td>
              <td>2</td>
              <td>6</td>
              <td>${this.formatMeasurement(82)}</td>
              <td>${this.formatMeasurement(64)}</td>
              <td>${this.formatMeasurement(88)}</td>
            </tr>
            <tr>
              <td><strong>S</strong></td>
              <td>36</td>
              <td>4</td>
              <td>8</td>
              <td>${this.formatMeasurement(86)}</td>
              <td>${this.formatMeasurement(68)}</td>
              <td>${this.formatMeasurement(92)}</td>
            </tr>
            <tr>
              <td><strong>M</strong></td>
              <td>38 - 40</td>
              <td>6 - 8</td>
              <td>10 - 12</td>
              <td>${this.formatMeasurement(92)}</td>
              <td>${this.formatMeasurement(74)}</td>
              <td>${this.formatMeasurement(98)}</td>
            </tr>
            <tr>
              <td><strong>L</strong></td>
              <td>42</td>
              <td>10</td>
              <td>14</td>
              <td>${this.formatMeasurement(98)}</td>
              <td>${this.formatMeasurement(80)}</td>
              <td>${this.formatMeasurement(104)}</td>
            </tr>
            <tr>
              <td><strong>XL</strong></td>
              <td>44 - 46</td>
              <td>12 - 14</td>
              <td>16 - 18</td>
              <td>${this.formatMeasurement(104)}</td>
              <td>${this.formatMeasurement(86)}</td>
              <td>${this.formatMeasurement(110)}</td>
            </tr>
          </tbody>
        </table>
      `;
    } else if (this.activeCategory === 'men') {
      tableContainer.innerHTML = `
        <table class="size-table">
          <thead>
            <tr>
              <th>سایز</th>
              <th>ایران / اروپا (EU)</th>
              <th>دور سینه (${this.unit})</th>
              <th>دور کمر (${this.unit})</th>
              <th>قد آستین (${this.unit})</th>
              <th>دور گردن (${this.unit})</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>S</strong></td>
              <td>46</td>
              <td>${this.formatMeasurement(92)}</td>
              <td>${this.formatMeasurement(78)}</td>
              <td>${this.formatMeasurement(62)}</td>
              <td>${this.formatMeasurement(38)}</td>
            </tr>
            <tr>
              <td><strong>M</strong></td>
              <td>48 - 50</td>
              <td>${this.formatMeasurement(98)}</td>
              <td>${this.formatMeasurement(84)}</td>
              <td>${this.formatMeasurement(64)}</td>
              <td>${this.formatMeasurement(40)}</td>
            </tr>
            <tr>
              <td><strong>L</strong></td>
              <td>52</td>
              <td>${this.formatMeasurement(104)}</td>
              <td>${this.formatMeasurement(90)}</td>
              <td>${this.formatMeasurement(65)}</td>
              <td>${this.formatMeasurement(42)}</td>
            </tr>
            <tr>
              <td><strong>XL</strong></td>
              <td>54</td>
              <td>${this.formatMeasurement(110)}</td>
              <td>${this.formatMeasurement(96)}</td>
              <td>${this.formatMeasurement(66)}</td>
              <td>${this.formatMeasurement(44)}</td>
            </tr>
            <tr>
              <td><strong>XXL</strong></td>
              <td>56</td>
              <td>${this.formatMeasurement(116)}</td>
              <td>${this.formatMeasurement(102)}</td>
              <td>${this.formatMeasurement(67)}</td>
              <td>${this.formatMeasurement(46)}</td>
            </tr>
          </tbody>
        </table>
      `;
    } else if (this.activeCategory === 'shoes') {
      tableContainer.innerHTML = `
        <table class="size-table">
          <thead>
            <tr>
              <th>سایز ایران / اروپا (EU)</th>
              <th>طول پا (${this.unit})</th>
              <th>آمریکا مردانه (US-M)</th>
              <th>آمریکا زنانه (US-W)</th>
              <th>انگلستان (UK)</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>36</td><td>${this.formatMeasurement(23.0)}</td><td>4.5</td><td>6.0</td><td>3.5</td></tr>
            <tr><td>37</td><td>${this.formatMeasurement(23.5)}</td><td>5.0</td><td>6.5</td><td>4.0</td></tr>
            <tr><td>38</td><td>${this.formatMeasurement(24.0)}</td><td>6.0</td><td>7.5</td><td>5.0</td></tr>
            <tr><td>39</td><td>${this.formatMeasurement(24.5)}</td><td>6.5</td><td>8.0</td><td>5.5</td></tr>
            <tr><td>40</td><td>${this.formatMeasurement(25.0)}</td><td>7.5</td><td>9.0</td><td>6.5</td></tr>
            <tr><td>41</td><td>${this.formatMeasurement(26.0)}</td><td>8.0</td><td>9.5</td><td>7.0</td></tr>
            <tr><td>42</td><td>${this.formatMeasurement(26.5)}</td><td>9.0</td><td>10.5</td><td>8.0</td></tr>
            <tr><td>43</td><td>${this.formatMeasurement(27.5)}</td><td>10.0</td><td>11.5</td><td>9.0</td></tr>
            <tr><td>44</td><td>${this.formatMeasurement(28.0)}</td><td>10.5</td><td>12.0</td><td>9.5</td></tr>
            <tr><td>45</td><td>${this.formatMeasurement(29.0)}</td><td>11.5</td><td>13.0</td><td>10.5</td></tr>
          </tbody>
        </table>
      `;
    } else if (this.activeCategory === 'accessories') {
      tableContainer.innerHTML = `
        <table class="size-table">
          <thead>
            <tr>
              <th>سایز انگشتر (ایران / سوئیس)</th>
              <th>محیط انگشت (${this.unit})</th>
              <th>قطر داخلی (${this.unit})</th>
              <th>سایز آمریکا (US)</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>50</td><td>${this.formatMeasurement(5.0)}</td><td>${this.formatMeasurement(1.59)}</td><td>5.25</td></tr>
            <tr><td>52</td><td>${this.formatMeasurement(5.2)}</td><td>${this.formatMeasurement(1.65)}</td><td>6.0</td></tr>
            <tr><td>54</td><td>${this.formatMeasurement(5.4)}</td><td>${this.formatMeasurement(1.72)}</td><td>6.75</td></tr>
            <tr><td>56</td><td>${this.formatMeasurement(5.6)}</td><td>${this.formatMeasurement(1.78)}</td><td>7.5</td></tr>
            <tr><td>58</td><td>${this.formatMeasurement(5.8)}</td><td>${this.formatMeasurement(1.85)}</td><td>8.5</td></tr>
            <tr><td>60</td><td>${this.formatMeasurement(6.0)}</td><td>${this.formatMeasurement(1.91)}</td><td>9.25</td></tr>
          </tbody>
        </table>
      `;
    }
  }

  bindCalculator() {
    const calcForm = document.getElementById('size-calculator-form');
    if (!calcForm) return;

    calcForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const gender = document.getElementById('calc-gender').value;
      const chest = parseFloat(document.getElementById('calc-chest').value);
      const waist = parseFloat(document.getElementById('calc-waist').value);
      const resultBox = document.getElementById('calc-result-box');

      if (!chest || !waist) {
        if (window.showToast) window.showToast('لطفاً مقادیر دور سینه و کمر را به درستی وارد فرمایید', 'error');
        return;
      }

      let recommended = 'M';
      let euEquivalent = '38 - 40';

      if (gender === 'women') {
        if (chest < 84) { recommended = 'XS'; euEquivalent = '34'; }
        else if (chest < 90) { recommended = 'S'; euEquivalent = '36'; }
        else if (chest < 96) { recommended = 'M'; euEquivalent = '38 - 40'; }
        else if (chest < 102) { recommended = 'L'; euEquivalent = '42'; }
        else { recommended = 'XL'; euEquivalent = '44 - 46'; }
      } else {
        if (chest < 94) { recommended = 'S'; euEquivalent = '46'; }
        else if (chest < 100) { recommended = 'M'; euEquivalent = '48 - 50'; }
        else if (chest < 106) { recommended = 'L'; euEquivalent = '52'; }
        else if (chest < 112) { recommended = 'XL'; euEquivalent = '54'; }
        else { recommended = 'XXL'; euEquivalent = '56'; }
      }

      resultBox.style.display = 'block';
      resultBox.innerHTML = `
        <div style="background: var(--bg-surface-subtle); border: 2px solid var(--accent); border-radius: var(--radius-xs); padding: 1.5rem; text-align: center;">
          <span style="font-size: var(--text-xs); color: var(--text-tertiary);">نتیجه تحلیل هوشمند:</span>
          <div style="font-size: var(--text-2xl); font-weight: 900; color: var(--accent); margin-block: 0.35rem;">
            سایز پیشنهادی: ${recommended} (معادل ${euEquivalent})
          </div>
          <p style="font-size: var(--text-xs); color: var(--text-secondary); max-width: 480px; margin-inline: auto;">
            این پیشنهاد با فرم بدنی استاندارد مطابقت دارد. در صورتی که تمایل به تن‌خور آزاد و اورسایز دارید، انتخاب یک سایز بزرگتر توصیه می‌شود.
          </p>
        </div>
      `;

      resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }
}

const novaSizeGuide = new SizeGuideManager();
window.novaSizeGuide = novaSizeGuide;

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('size-table-container')) {
    novaSizeGuide.init();
  }
});
