
// script.js - multi-store version (manager + stores) with enhanced manager dashboard
// Utilities
function qs(id){return document.getElementById(id)}
function qsa(sel){return document.querySelectorAll(sel)}
function navClockTick(){ const el = qs('navClock'); if(el) el.textContent = new Date().toLocaleTimeString(); }
setInterval(navClockTick,1000); navClockTick();

// Demo credentials and stores
const STORE_USERS = {
  'lawrence': { password: 'law123', displayName: 'Lawrence' },
  'oakville': { password: 'oak123', displayName: 'Oakville' }
};
const MANAGER = { username: 'manager', password: 'mgr123', name: 'Manager' };

// Sample inventory from Trial.xlsx
const SAMPLE_INVENTORY = [
  {"id":1,"name":"A15","sku":"SKU001","qty":1,"staged":0,"type":"device"},
  {"id":2,"name":"A16","sku":"SKU002","qty":10,"staged":0,"type":"device"},
  {"id":3,"name":"A35","sku":"SKU003","qty":0,"staged":0,"type":"device"},
  {"id":4,"name":"A36","sku":"SKU004","qty":2,"staged":0,"type":"device"},
  {"id":5,"name":"C210","sku":"SKU005","qty":0,"staged":0,"type":"device"},
  {"id":6,"name":"G310","sku":"SKU006","qty":3,"staged":0,"type":"device"},
  {"id":7,"name":"G400","sku":"SKU007","qty":0,"staged":0,"type":"device"},
  {"id":8,"name":"HSI","sku":"SKU008","qty":7,"staged":0,"type":"device"},
  {"id":9,"name":"Iphone 13","sku":"SKU009","qty":2,"staged":0,"type":"device"},
  {"id":10,"name":"Iphone 14","sku":"SKU010","qty":1,"staged":0,"type":"device"},
  {"id":11,"name":"Iphone 16","sku":"SKU011","qty":0,"staged":0,"type":"device"},
  {"id":12,"name":"Iphone 16 e","sku":"SKU012","qty":1,"staged":0,"type":"device"},
  {"id":13,"name":"Iphone 16 plus","sku":"SKU013","qty":0,"staged":0,"type":"device"},
  {"id":14,"name":"Iphone 16 pro","sku":"SKU014","qty":0,"staged":0,"type":"device"},
  {"id":15,"name":"Iphone 16 pro max","sku":"SKU015","qty":0,"staged":0,"type":"device"},
  {"id":16,"name":"Moto g 2024","sku":"SKU016","qty":4,"staged":0,"type":"device"},
  {"id":17,"name":"Moto g 2025","sku":"SKU017","qty":10,"staged":0,"type":"device"},
  {"id":18,"name":"Moto power 2024","sku":"SKU018","qty":0,"staged":0,"type":"device"},
  {"id":19,"name":"Moto power 2025","sku":"SKU019","qty":1,"staged":0,"type":"device"},
  {"id":20,"name":"Moto razr 2024","sku":"SKU020","qty":1,"staged":0,"type":"device"},
  {"id":21,"name":"Moto stylus 2023","sku":"SKU021","qty":0,"staged":0,"type":"device"},
  {"id":22,"name":"Moto stylus 2024","sku":"SKU022","qty":0,"staged":0,"type":"device"},
  {"id":23,"name":"Moto stylus 2025","sku":"SKU023","qty":1,"staged":0,"type":"device"},
  {"id":24,"name":"Moto edge 2024","sku":"SKU024","qty":1,"staged":0,"type":"device"},
  {"id":25,"name":"Revvl 7","sku":"SKU025","qty":8,"staged":0,"type":"device"},
  {"id":26,"name":"Revvl 7 pro","sku":"SKU026","qty":3,"staged":0,"type":"device"},
  {"id":27,"name":"S 23 FE","sku":"SKU027","qty":1,"staged":0,"type":"device"},
  {"id":28,"name":"S24 FE","sku":"SKU028","qty":1,"staged":0,"type":"device"},
  {"id":29,"name":"TCL 50 XL 3","sku":"SKU029","qty":3,"staged":0,"type":"device"},
  {"id":30,"name":"TCL K32","sku":"SKU030","qty":6,"staged":0,"type":"device"},
  {"id":31,"name":"TCL ION X","sku":"SKU031","qty":0,"staged":0,"type":"device"},
  {"id":32,"name":"TCL K11","sku":"SKU032","qty":3,"staged":0,"type":"device"},
  {"id":33,"name":"Flip Phone 3","sku":"SKU033","qty":1,"staged":0,"type":"device"},
  {"id":34,"name":"TCL Tab","sku":"SKU034","qty":10,"staged":0,"type":"device"},
  {"id":35,"name":"Samsung Tab 3","sku":"SKU035","qty":5,"staged":0,"type":"device"},
  {"id":36,"name":"Samsung Watch","sku":"SKU036","qty":1,"staged":0,"type":"device"},
  {"id":37,"name":"Apple Watch","sku":"SKU037","qty":1,"staged":0,"type":"device"},
  {"id":38,"name":"Chrome book","sku":"SKU038","qty":0,"staged":0,"type":"device"},
  {"id":39,"name":"Google pixel","sku":"SKU039","qty":0,"staged":0,"type":"device"},
  {"id":40,"name":"Revvl Tab","sku":"SKU040","qty":17,"staged":0,"type":"device"},
  {"id":41,"name":"Revvl 8","sku":"SKU041","qty":5,"staged":0,"type":"device"},
  {"id":42,"name":"SIM Cards","sku":"SKU042","qty":50,"staged":0,"type":"sim"}
];

// Initialize example store data if missing
function ensureStores(){
  const key = 'TimeTrack_StoresData_v2';
  if(!localStorage.getItem(key)){
    const stores = {
      lawrence: {
        id: 'lawrence',
        name: 'Lawrence',
        inventory: SAMPLE_INVENTORY,
        eods: [
          {date: '10/29/2025', cash: 450, credit: 890, boxes: 3, qpay: 120, notes: 'Busy day', total: 1460, submittedBy: 'Lowell', submittedAt: new Date('2025-10-29T18:30:00').toISOString()},
          {date: '10/28/2025', cash: 320, credit: 670, boxes: 2, qpay: 80, notes: 'Normal operations', total: 1070, submittedBy: 'Manoj', submittedAt: new Date('2025-10-28T18:15:00').toISOString()}
        ],
        history: [
          {action:'Clock In', timestamp: new Date('2025-10-30T09:00:00').toISOString(), user: 'Lowell'},
          {action:'Clock In', timestamp: new Date('2025-10-30T09:15:00').toISOString(), user: 'Manoj'},
          {action:'Clock Out', timestamp: new Date('2025-10-30T17:00:00').toISOString(), user: 'Lowell', duration: '8h 0m'},
        ],
      },
      oakville: {
        id: 'oakville',
        name: 'Oakville',
        inventory: SAMPLE_INVENTORY.slice(0, 20),
        eods: [
          {date: '10/29/2025', cash: 380, credit: 720, boxes: 2, qpay: 95, notes: 'Good sales', total: 1195, submittedBy: 'Store', submittedAt: new Date('2025-10-29T18:45:00').toISOString()}
        ],
        history: [
          {action:'Clock In', timestamp: new Date('2025-10-30T08:45:00').toISOString(), user: 'Employee'},
          {action:'Clock Out', timestamp: new Date('2025-10-30T16:45:00').toISOString(), user: 'Employee', duration: '8h 0m'}
        ],
      }
    };
    localStorage.setItem(key, JSON.stringify(stores));
  }
}
ensureStores();

function loadStores(){ return JSON.parse(localStorage.getItem('TimeTrack_StoresData_v2')||'{}'); }
function saveStores(stores){ localStorage.setItem('TimeTrack_StoresData_v2', JSON.stringify(stores)); }

// Auth helpers
function saveSession(session){ localStorage.setItem('TimeTrack_Session', JSON.stringify(session)); }
function loadSession(){ try{return JSON.parse(localStorage.getItem('TimeTrack_Session')); }catch(e){return null} }
function clearSession(){ localStorage.removeItem('TimeTrack_Session'); }

function logoutApp(){ clearSession(); window.location='index.html'; }

// INDEX - login handling
if(qs('loginForm')){
  qs('loginBtn').addEventListener('click', function(){
    const user = qs('username').value.trim();
    const pass = qs('password').value;
    const msg = qs('loginMessage');
    if(!user || !pass){ showMsg(msg,'Please enter username and password','error'); return; }
    // manager
    if(user === MANAGER.username && pass === MANAGER.password){
      saveSession({ role:'manager', username:MANAGER.username, name:MANAGER.name });
      window.location='manager.html'; return;
    }
    // store login
    if(STORE_USERS[user] && STORE_USERS[user].password === pass){
      saveSession({ role:'store', username:user, storeId:user, storeName:STORE_USERS[user].displayName });
      window.location='dashboard.html'; return;
    }
    showMsg(msg,'Invalid credentials','error');
  });
  function showMsg(el,text,type){ if(!el) return; el.textContent=text; el.className='message '+(type==='error'?'error':'success'); el.style.display='block'; setTimeout(()=>el.style.display='none',3000); }
}

// Protected pages (non-index)
const protectedPages = ['dashboard','timeclock','inventory','eod','manager','store-employees','store-inventory','store-eod','store-employees-today','store-employees-history','store-eod-list','store-eod-detail'];
const path = window.location.pathname.split('/').pop();
const page = path.split('.html')[0];
if(protectedPages.includes(page)){
  const session = loadSession();
  if(!session){ window.location='index.html'; }
  else {
    // populate nav info
    const nameEls = document.querySelectorAll('.nav-username');
    nameEls.forEach(e=> e.textContent = session.name || session.storeName || '');
    const roleEls = document.querySelectorAll('.nav-role');
    roleEls.forEach(e=> e.textContent = session.role==='manager' ? 'Manager' : (session.storeName ? session.storeName + ' Store' : 'Store'));
    // highlight active link
    document.querySelectorAll('.nav-links a').forEach(a=>{ if(a.getAttribute('href') && a.getAttribute('href').includes(page)) a.classList.add('active'); });
  }
}

// DASHBOARD - centered welcome for store
if(qs('dashboardWelcome')){
  const session = loadSession();
  qs('dashboardWelcome').textContent = `Welcome back, ${session.storeName} Store`;
  qs('dashboardRole').textContent = session.storeName + ' Store';
}

// MANAGER - show collapsible store cards
if(qs('managerRoot')){
  const stores = loadStores();
  const container = qs('managerCards');
  container.innerHTML='';
  
  Object.values(stores).forEach(s=>{
    // Calculate stats
    const todayHistory = (s.history||[]).filter(h => {
      const hDate = new Date(h.timestamp).toDateString();
      const today = new Date().toDateString();
      return hDate === today;
    });
    
    const clockedInEmployees = todayHistory.filter(h => h.action === 'Clock In' && !todayHistory.some(out => out.user === h.user && out.action === 'Clock Out' && new Date(out.timestamp) > new Date(h.timestamp)));
    const clockedOutEmployees = todayHistory.filter(h => h.action === 'Clock Out');
    
    const totalInventory = s.inventory.reduce((sum, item) => sum + item.qty, 0);
    const lowStockItems = s.inventory.filter(item => item.qty > 0 && item.qty <= 3).length;
    const outOfStockItems = s.inventory.filter(item => item.qty === 0).length;
    
    const latestEod = s.eods && s.eods.length > 0 ? s.eods[s.eods.length - 1] : null;
    
    // Create store card
    const card = document.createElement('div');
    card.className = 'simple-store-card';
    card.id = 'store-' + s.id;
    
    let employeeListHTML = '';
    if(todayHistory.length === 0){
      employeeListHTML = '<div class="no-data">No employee activity today</div>';
    } else {
      const uniqueEmployees = {};
      todayHistory.forEach(h => {
        if(!uniqueEmployees[h.user] || new Date(h.timestamp) > new Date(uniqueEmployees[h.user].timestamp)){
          uniqueEmployees[h.user] = h;
        }
      });
      
      Object.values(uniqueEmployees).forEach(emp => {
        const isIn = emp.action === 'Clock In';
        const statusClass = isIn ? 'in' : 'out';
        const statusText = isIn ? 'Clocked In' : 'Clocked Out';
        const time = new Date(emp.timestamp).toLocaleTimeString();
        const duration = emp.duration ? ` (${emp.duration})` : '';
        
        employeeListHTML += `
          <div class="employee-item ${isIn ? '' : 'clocked-out'}">
            <div>
              <div class="employee-name">${emp.user}</div>
              <div class="employee-time">${time}${duration}</div>
            </div>
            <span class="employee-status ${statusClass}">${statusText}</span>
          </div>
        `;
      });
    }
    
    // Top inventory items (showing first 8)
    let inventoryHTML = '';
    const topItems = s.inventory.slice(0, 8);
    topItems.forEach(item => {
      let qtyClass = 'high';
      if(item.qty === 0) qtyClass = 'low';
      else if(item.qty <= 3) qtyClass = 'medium';
      
      inventoryHTML += `
        <div class="inventory-item">
          <div class="inventory-item-name">${item.name}</div>
          <div class="inventory-item-qty ${qtyClass}">${item.qty}</div>
        </div>
      `;
    });
    
    // EOD summary
    let eodHTML = '';
    if(latestEod){
      eodHTML = `
        <div class="eod-summary">
          <div class="eod-row">
            <span class="eod-label">Date</span>
            <span class="eod-value">${latestEod.date}</span>
          </div>
          <div class="eod-row">
            <span class="eod-label">Cash</span>
            <span class="eod-value">$${latestEod.cash.toFixed(2)}</span>
          </div>
          <div class="eod-row">
            <span class="eod-label">Credit</span>
            <span class="eod-value">$${latestEod.credit.toFixed(2)}</span>
          </div>
          <div class="eod-row">
            <span class="eod-label">QPay</span>
            <span class="eod-value">$${latestEod.qpay.toFixed(2)}</span>
          </div>
          <div class="eod-row">
            <span class="eod-label">Total</span>
            <span class="eod-value">$${latestEod.total.toFixed(2)}</span>
          </div>
        </div>
      `;
    } else {
      eodHTML = '<div class="no-data">No EOD reports submitted</div>';
    }
    
    card.innerHTML = `
      <div class="simple-card-header">
        <h3>${s.name} Store</h3>
        <div class="store-status">Active</div>
      </div>
      <div class="simple-card-actions">
        <button class="manage-store-btn" onclick="toggleStoreDetails('${s.id}')">
          <span class="icon">📊</span>
          <span>Manage Store</span>
        </button>
      </div>
      <div class="store-card-details" id="details-${s.id}">
      <div class="store-card-body">
        <!-- Quick Stats -->
        <div class="store-section">
          <div class="store-section-title">
            <span class="icon">📊</span>
            <span>Quick Stats</span>
          </div>
          <div class="store-info-grid">
            <div class="info-box success">
              <div class="info-box-label">Total Inventory</div>
              <div class="info-box-value">${totalInventory}</div>
              <div class="info-box-detail">${s.inventory.length} items</div>
            </div>
            <div class="info-box ${lowStockItems > 0 ? 'warning' : 'success'}">
              <div class="info-box-label">Low Stock</div>
              <div class="info-box-value">${lowStockItems}</div>
              <div class="info-box-detail">${outOfStockItems} out of stock</div>
            </div>
            <div class="info-box clickable" onclick="viewEmployeesToday('${s.id}')" style="cursor:pointer">
              <div class="info-box-label">Employees Today</div>
              <div class="info-box-value">${Object.keys(todayHistory.reduce((acc, h) => ({...acc, [h.user]: true}), {})).length}</div>
              <div class="info-box-detail">${clockedInEmployees.length} currently in</div>
            </div>
            <div class="info-box ${latestEod ? 'success' : 'warning'} clickable" onclick="viewEodReports('${s.id}')" style="cursor:pointer">
              <div class="info-box-label">EOD Reports</div>
              <div class="info-box-value">${s.eods.length}</div>
              <div class="info-box-detail">${latestEod ? 'Latest: ' + latestEod.date : 'None yet'}</div>
            </div>
          </div>
        </div>
        
        <!-- Employee Clock In/Out -->
        <div class="store-section">
          <div class="store-section-title">
            <span class="icon">👥</span>
            <span>Employee Clock In/Out (Today)</span>
          </div>
          <div class="employee-list">
            ${employeeListHTML}
          </div>
        </div>
        
        <!-- Inventory Preview -->
        <div class="store-section">
          <div class="store-section-title">
            <span class="icon">📦</span>
            <span>Inventory Preview (Top Items)</span>
          </div>
          <div class="inventory-grid">
            ${inventoryHTML}
          </div>
        </div>
        
        <!-- Latest EOD Report -->
        <div class="store-section">
          <div class="store-section-title">
            <span class="icon">💰</span>
            <span>Latest End of Day Report</span>
          </div>
          ${eodHTML}
        </div>
      </div>
      </div>
    `;
    
    container.appendChild(card);
  });
}

function openManageStore(storeId){
  // manager opens separate subpages with query param
  window.location = `store-employees.html?store=${encodeURIComponent(storeId)}`;
}

// Toggle store details visibility
function toggleStoreDetails(storeId){
  const detailsDiv = document.getElementById('details-' + storeId);
  const card = document.getElementById('store-' + storeId);
  const btn = card.querySelector('.manage-store-btn');
  
  if(detailsDiv.classList.contains('expanded')){
    // Collapse
    detailsDiv.classList.remove('expanded');
    card.classList.remove('expanded');
    btn.innerHTML = '<span class="icon">📊</span><span>Manage Store</span>';
  } else {
    // Expand
    detailsDiv.classList.add('expanded');
    card.classList.add('expanded');
    btn.innerHTML = '<span class="icon">🔼</span><span>Hide Details</span>';
  }
}
window.toggleStoreDetails = toggleStoreDetails;

// Navigate to employees today page
function viewEmployeesToday(storeId){
  window.location = `store-employees-today.html?store=${encodeURIComponent(storeId)}`;
}
window.viewEmployeesToday = viewEmployeesToday;

// Navigate to EOD reports page
function viewEodReports(storeId){
  window.location = `store-eod-list.html?store=${encodeURIComponent(storeId)}`;
}
window.viewEodReports = viewEodReports;

// STORE-EMPLOYEES (manager view)
if(qs('storeEmployeesRoot')){
  const params = new URLSearchParams(window.location.search);
  const storeId = params.get('store');
  const stores = loadStores();
  const s = stores[storeId];
  qs('storeTitle').textContent = `${s.name} — Employees & Activity`;
  const list = qs('employeesList'); list.innerHTML='';
  const todays = (s.history||[]).filter(h => new Date(h.timestamp).toDateString() === new Date().toDateString());
  if(todays.length === 0){ list.innerHTML = `<div style="text-align:center;color:#666;padding:18px">No activity today</div>`; }
  else{
    todays.forEach(it=>{
      const div = document.createElement('div'); div.className='card'; div.innerHTML = `<strong>${it.user}</strong> · ${new Date(it.timestamp).toLocaleTimeString()} · ${it.action}`; list.appendChild(div);
    });
  }
  // link to other manager subpages
  qs('manageInventoryBtn').addEventListener('click', ()=> window.location = `store-inventory.html?store=${storeId}`);
  qs('manageEodBtn').addEventListener('click', ()=> window.location = `store-eod.html?store=${storeId}`);
}

// STORE-INVENTORY (manager view)
if(qs('storeInventoryRoot')){
  const params = new URLSearchParams(window.location.search);
  const storeId = params.get('store');
  const stores = loadStores();
  const s = stores[storeId];
  qs('storeInvTitle').textContent = `${s.name} — Inventory`;
  const tbody = qs('storeInvBody'); tbody.innerHTML='';
  s.inventory.forEach(it=>{
    const tr = document.createElement('tr'); tr.innerHTML = `<td>${it.name}</td><td>${it.sku}</td><td>${it.qty}</td>`; tbody.appendChild(tr);
  });
}

// STORE-EOD (manager view)
if(qs('storeEodRoot')){
  const params = new URLSearchParams(window.location.search);
  const storeId = params.get('store');
  const stores = loadStores();
  const s = stores[storeId];
  qs('storeEodTitle').textContent = `${s.name} — End of Day Submissions`;
  const list = qs('storeEodList'); list.innerHTML='';
  if((s.eods||[]).length === 0) list.innerHTML = `<div style="text-align:center;color:#666;padding:18px">No EODs submitted</div>`;
  else s.eods.forEach(e=>{ const card = document.createElement('div'); card.className='card'; card.innerHTML = `<strong>${new Date(e.submittedAt).toLocaleString()}</strong><div class="small">By ${e.submittedBy} · Total: $${e.total}</div>`; list.appendChild(card); });
}

// STORE (employee) PAGES: timeclock, inventory, eod, history behavior - scoped to current store session
if(qs('timeclockTabRoot')){
  const session = loadSession();
  const stores = loadStores();
  const s = stores[session.storeId];
  // elements
  let currentStream = null; let currentAction = null; let capturedImage = null;
  const statusText = qs('statusText'); const timeDisplay = qs('timeDisplay');
  const clockInBtn = qs('clockInBtn'); const clockOutBtn = qs('clockOutBtn');
  function updateUI(){ const state = JSON.parse(localStorage.getItem(`storeState_${session.storeId}`) || 'null'); if(state && state.clockedIn){ statusText.textContent='Currently Clocked In'; timeDisplay.textContent = new Date(state.clockInTime).toLocaleTimeString(); clockInBtn.disabled=true; clockOutBtn.disabled=false; } else { statusText.textContent='Ready to Clock In'; timeDisplay.textContent='--:--:--'; clockInBtn.disabled=false; clockOutBtn.disabled=true; } }
  updateUI();
  clockInBtn.addEventListener('click', ()=>{ currentAction='clockin'; openCam(); });
  clockOutBtn.addEventListener('click', ()=>{ currentAction='clockout'; openCam(); });
  async function openCam(){ try{ const st = await navigator.mediaDevices.getUserMedia({video:{facingMode:'user'}}); currentStream = st; qs('video').srcObject = st; qs('cameraContainer').style.display='block'; qs('clockButtons').style.display='none'; }catch(e){ alert('Camera denied'); } }
  qs('captureBtn').addEventListener('click', ()=>{ const v = qs('video'); const c = document.createElement('canvas'); c.width=v.videoWidth; c.height=v.videoHeight; c.getContext('2d').drawImage(v,0,0); capturedImage = c.toDataURL('image/jpeg',0.8); qs('capturedPhoto').src = capturedImage; qs('photoPreview').style.display='block'; qs('cameraContainer').style.display='none'; });
  qs('confirmPhotoBtn') && qs('confirmPhotoBtn').addEventListener('click', ()=>{ const now = new Date(); const userName = 'Employee'; // employees don't authenticate; could be extended to ask name
    if(currentAction==='clockin'){ // save as history entry
      s.history.push({ action:'Clock In', timestamp: now.toISOString(), photo: capturedImage, user: 'Employee' }); localStorage.setItem('TimeTrack_StoresData_v2', JSON.stringify(stores)); // persist
      saveStoreState(session.storeId, { clockedIn:true, clockInTime: now.toISOString() });
      alert('Clocked in'); } else if(currentAction==='clockout'){ const state = JSON.parse(localStorage.getItem(`storeState_${session.storeId}`)||'null'); if(state && state.clockedIn){ const duration = calcDuration(new Date(state.clockInTime), now); s.history.push({ action:'Clock Out', timestamp: now.toISOString(), photo: capturedImage, user: 'Employee', duration }); localStorage.setItem('TimeTrack_StoresData_v2', JSON.stringify(stores)); saveStoreState(session.storeId, { clockedIn:false, clockInTime:null }); alert('Clocked out: '+duration); } }
    closeCam(); qs('photoPreview').style.display='none'; updateUI();
  });
  qs('retakeBtn') && qs('retakeBtn').addEventListener('click', ()=>{ qs('photoPreview').style.display='none'; openCam(); });
  qs('cancelCameraBtn') && qs('cancelCameraBtn').addEventListener('click', ()=>{ closeCam(); });
  function closeCam(){ if(currentStream){ currentStream.getTracks().forEach(t=>t.stop()); currentStream = null; } qs('cameraContainer').style.display='none'; qs('clockButtons').style.display='block'; }
  function saveStoreState(storeId,state){ localStorage.setItem(`storeState_${storeId}`, JSON.stringify(state)); }
  function calcDuration(start,end){ const diff = end - start; const hrs = Math.floor(diff / (1000*60*60)); const mins = Math.floor((diff % (1000*60*60)) / (1000*60)); return `${hrs}h ${mins}m`; }
}

// Employee-scoped Inventory page
if(qs('inventoryRoot')){
  const session = loadSession(); const stores = loadStores(); const s = stores[session.storeId];
  
  // Ensure all items have staged property
  s.inventory.forEach(item => {
    if(item.staged === undefined) item.staged = 0;
    if(item.type === undefined) item.type = 'device';
  });
  
  // Calculate totals
  const totalDevices = s.inventory.filter(i => i.type === 'device').reduce((sum, i) => sum + i.qty, 0);
  const totalSims = s.inventory.filter(i => i.type === 'sim').reduce((sum, i) => sum + i.qty, 0);
  
  // Display summary
  const summaryDiv = qs('inventorySummary');
  summaryDiv.innerHTML = `
    <div class="summary-box">
      <h3>Total Devices</h3>
      <div class="value">${totalDevices}</div>
    </div>
    <div class="summary-box">
      <h3>Total SIM Cards</h3>
      <div class="value">${totalSims}</div>
    </div>
  `;
  
  const tbody = qs('inventoryTableBody'); tbody.innerHTML='';
  s.inventory.forEach(it=>{ 
    const tr=document.createElement('tr'); 
    tr.innerHTML = `
      <td>${it.name}</td>
      <td>${it.sku}</td>
      <td><strong>${it.qty}</strong></td>
      <td><input type="number" class="stage-input" id="stage-${it.id}" min="0" value="${it.staged || 0}"></td>
      <td><button onclick="stageItem(${it.id})" class="stage-btn">Stage</button></td>
    `; 
    tbody.appendChild(tr); 
  });
  
  window.stageItem = function(itemId){
    const val = parseInt(qs('stage-'+itemId).value);
    if(isNaN(val) || val < 0){ alert('Enter valid quantity'); return; }
    const item = s.inventory.find(i=>i.id===itemId);
    item.staged = val;
    saveStores(stores);
    alert(`Staged ${val} for ${item.name}`);
  }
  
  qs('updateAllBtn').addEventListener('click', function(){
    let updated = [];
    s.inventory.forEach(item => {
      if(item.staged && item.staged > 0){
        item.qty = item.staged;
        updated.push(item.name);
        item.staged = 0;
      }
    });
    if(updated.length > 0){
      saveStores(stores);
      alert(`Updated ${updated.length} items: ${updated.join(', ')}`);
      window.location.reload();
    } else {
      alert('No staged items to update');
    }
  });
}

// EOD page for store
if(qs('eodRoot')){
  const session = loadSession(); const stores = loadStores(); const s = stores[session.storeId];
  qs('submitEodBtn').addEventListener('click', ()=>{
    const cash = parseFloat(qs('cashAmount').value) || 0; const credit = parseFloat(qs('creditAmount').value) || 0; const boxes = parseInt(qs('boxesCount').value) || 0; const qpay = parseFloat(qs('qpayAmount').value) || 0; const notes = qs('eodNotes').value || '';
    const eod = { date: new Date().toDateString(), cash, credit, boxes, qpay, notes, total: cash+credit+qpay, submittedBy: 'Store', submittedAt: new Date().toISOString() };
    s.eods.push(eod); saveStores(stores); alert('EOD submitted: $'+eod.total.toFixed(2)); qs('cashAmount').value=''; qs('creditAmount').value=''; qs('boxesCount').value=''; qs('qpayAmount').value=''; qs('eodNotes').value='';
  });
}



// Protect manager-only pages: manager subpages require manager session
const managerPages = ['manager','store-employees','store-inventory','store-eod','store-employees-today','store-employees-history','store-eod-list','store-eod-detail'];
if(managerPages.includes(page)){
  const sess = loadSession();
  if(!sess || sess.role!=='manager'){ window.location='index.html'; }
}

// STORE-EMPLOYEES-TODAY (manager view)
if(qs('employeesTodayList')){
  const params = new URLSearchParams(window.location.search);
  const storeId = params.get('store');
  const stores = loadStores();
  const s = stores[storeId];
  qs('storeTitle').textContent = `${s.name} — Employees Working Today`;
  
  const list = qs('employeesTodayList');
  list.innerHTML = '';
  
  // Get today's history
  const todayHistory = (s.history||[]).filter(h => {
    const hDate = new Date(h.timestamp).toDateString();
    const today = new Date().toDateString();
    return hDate === today;
  });
  
  if(todayHistory.length === 0){
    list.innerHTML = `<div class="card" style="text-align:center;color:#666;padding:18px">No employees working today</div>`;
  } else {
    // Group by employee
    const employeeMap = {};
    todayHistory.forEach(h => {
      if(!employeeMap[h.user]){
        employeeMap[h.user] = { name: h.user, clockIn: null, clockOut: null, status: 'out' };
      }
      if(h.action === 'Clock In'){
        employeeMap[h.user].clockIn = h.timestamp;
        employeeMap[h.user].status = 'in';
      } else if(h.action === 'Clock Out'){
        employeeMap[h.user].clockOut = h.timestamp;
        employeeMap[h.user].status = 'out';
        employeeMap[h.user].duration = h.duration;
      }
    });
    
    Object.values(employeeMap).forEach(emp => {
      const card = document.createElement('div');
      card.className = 'card';
      const statusClass = emp.status === 'in' ? 'success' : 'warning';
      const statusText = emp.status === 'in' ? '🟢 Currently Working' : '🔴 Clocked Out';
      const clockInTime = emp.clockIn ? new Date(emp.clockIn).toLocaleTimeString() : 'N/A';
      const clockOutTime = emp.clockOut ? new Date(emp.clockOut).toLocaleTimeString() : 'N/A';
      const duration = emp.duration || 'N/A';
      
      card.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div>
            <h3 style="margin:0 0 8px 0">${emp.name}</h3>
            <div class="small">Clock In: ${clockInTime}</div>
            <div class="small">Clock Out: ${clockOutTime}</div>
            ${emp.duration ? `<div class="small">Duration: ${duration}</div>` : ''}
          </div>
          <div class="employee-status ${statusClass}" style="font-size:14px;padding:8px 16px">${statusText}</div>
        </div>
      `;
      list.appendChild(card);
    });
  }
  
  qs('backBtn').addEventListener('click', () => window.location = 'manager.html');
  qs('viewHistoryBtn').addEventListener('click', () => window.location = `store-employees-history.html?store=${storeId}`);
}

// STORE-EMPLOYEES-HISTORY (manager view)
if(qs('employeeHistoryList')){
  const params = new URLSearchParams(window.location.search);
  const storeId = params.get('store');
  const stores = loadStores();
  const s = stores[storeId];
  qs('storeTitle').textContent = `${s.name} — Employee History`;
  
  const list = qs('employeeHistoryList');
  list.innerHTML = '';
  
  if((s.history||[]).length === 0){
    list.innerHTML = `<div class="card" style="text-align:center;color:#666;padding:18px">No employee history</div>`;
  } else {
    // Group by employee and calculate total hours
    const employeeMap = {};
    s.history.forEach(h => {
      if(!employeeMap[h.user]){
        employeeMap[h.user] = { name: h.user, totalHours: 0, sessions: [] };
      }
      
      if(h.action === 'Clock In'){
        employeeMap[h.user].sessions.push({ clockIn: h.timestamp, clockOut: null, duration: null });
      } else if(h.action === 'Clock Out'){
        // Find the last session without clock out
        const lastSession = employeeMap[h.user].sessions.find(s => !s.clockOut);
        if(lastSession){
          lastSession.clockOut = h.timestamp;
          lastSession.duration = h.duration;
          
          // Calculate total hours
          const start = new Date(lastSession.clockIn);
          const end = new Date(lastSession.clockOut);
          const hours = (end - start) / (1000 * 60 * 60);
          employeeMap[h.user].totalHours += hours;
        }
      }
    });
    
    Object.values(employeeMap).forEach(emp => {
      const card = document.createElement('div');
      card.className = 'card';
      
      let sessionsHTML = '';
      emp.sessions.forEach((session, idx) => {
        const clockInTime = new Date(session.clockIn).toLocaleString();
        const clockOutTime = session.clockOut ? new Date(session.clockOut).toLocaleString() : 'Still working';
        const duration = session.duration || 'N/A';
        
        sessionsHTML += `
          <div style="padding:8px;background:#f8f9fa;margin-top:8px;border-radius:4px">
            <div class="small"><strong>Session ${idx + 1}</strong></div>
            <div class="small">Clock In: ${clockInTime}</div>
            <div class="small">Clock Out: ${clockOutTime}</div>
            <div class="small">Duration: ${duration}</div>
          </div>
        `;
      });
      
      card.innerHTML = `
        <h3 style="margin:0 0 8px 0">${emp.name}</h3>
        <div style="margin-bottom:12px">
          <strong>Total Hours:</strong> ${emp.totalHours.toFixed(2)} hours
        </div>
        <div style="margin-bottom:8px"><strong>Sessions (${emp.sessions.length}):</strong></div>
        ${sessionsHTML}
      `;
      list.appendChild(card);
    });
  }
  
  qs('backBtn').addEventListener('click', () => window.location = 'manager.html');
  qs('viewTodayBtn').addEventListener('click', () => window.location = `store-employees-today.html?store=${storeId}`);
}

// STORE-EOD-LIST (manager view)
if(qs('eodListContainer')){
  const params = new URLSearchParams(window.location.search);
  const storeId = params.get('store');
  const stores = loadStores();
  const s = stores[storeId];
  qs('storeTitle').textContent = `${s.name} — End of Day Reports`;
  
  const container = qs('eodListContainer');
  container.innerHTML = '';
  
  if((s.eods||[]).length === 0){
    container.innerHTML = `<div class="card" style="text-align:center;color:#666;padding:18px">No EOD reports submitted</div>`;
  } else {
    // Show all EODs in reverse chronological order
    s.eods.slice().reverse().forEach((eod, idx) => {
      const card = document.createElement('div');
      card.className = 'card';
      card.style.cursor = 'pointer';
      card.style.transition = 'all 0.2s';
      card.onmouseover = () => card.style.background = '#f8f9fa';
      card.onmouseout = () => card.style.background = '#fff';
      
      const actualIndex = s.eods.length - 1 - idx;
      card.onclick = () => window.location = `store-eod-detail.html?store=${storeId}&index=${actualIndex}`;
      
      card.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div>
            <h3 style="margin:0 0 8px 0">${eod.date}</h3>
            <div class="small">Submitted by: ${eod.submittedBy}</div>
            <div class="small">Time: ${new Date(eod.submittedAt).toLocaleString()}</div>
          </div>
          <div style="text-align:right">
            <div style="font-size:24px;font-weight:bold;color:#28a745">$${eod.total.toFixed(2)}</div>
            <div class="small" style="color:#666">Click to view details</div>
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  }
  
  qs('backBtn').addEventListener('click', () => window.location = 'manager.html');
}

// STORE-EOD-DETAIL (manager view)
if(qs('eodDetailContainer')){
  const params = new URLSearchParams(window.location.search);
  const storeId = params.get('store');
  const eodIndex = parseInt(params.get('index'));
  const stores = loadStores();
  const s = stores[storeId];
  const eod = s.eods[eodIndex];
  
  qs('eodDetailTitle').textContent = `${s.name} — EOD Report: ${eod.date}`;
  
  const container = qs('eodDetailContainer');
  container.innerHTML = '';
  
  const card = document.createElement('div');
  card.className = 'card';
  
  card.innerHTML = `
    <h3 style="margin:0 0 16px 0">Report Details</h3>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px">
      <div>
        <div class="small" style="color:#666;margin-bottom:4px">Date</div>
        <div style="font-weight:bold">${eod.date}</div>
      </div>
      <div>
        <div class="small" style="color:#666;margin-bottom:4px">Submitted By</div>
        <div style="font-weight:bold">${eod.submittedBy}</div>
      </div>
      <div>
        <div class="small" style="color:#666;margin-bottom:4px">Submission Time</div>
        <div style="font-weight:bold">${new Date(eod.submittedAt).toLocaleString()}</div>
      </div>
    </div>
    
    <hr style="border:none;border-top:1px solid #e0e0e0;margin:16px 0">
    
    <h3 style="margin:16px 0">Financial Summary</h3>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px">
      <div style="padding:12px;background:#f8f9fa;border-radius:8px">
        <div class="small" style="color:#666;margin-bottom:4px">Cash Amount</div>
        <div style="font-size:20px;font-weight:bold;color:#28a745">$${eod.cash.toFixed(2)}</div>
      </div>
      <div style="padding:12px;background:#f8f9fa;border-radius:8px">
        <div class="small" style="color:#666;margin-bottom:4px">Credit Amount</div>
        <div style="font-size:20px;font-weight:bold;color:#007bff">$${eod.credit.toFixed(2)}</div>
      </div>
      <div style="padding:12px;background:#f8f9fa;border-radius:8px">
        <div class="small" style="color:#666;margin-bottom:4px">QPay Amount</div>
        <div style="font-size:20px;font-weight:bold;color:#ffc107">$${eod.qpay.toFixed(2)}</div>
      </div>
      <div style="padding:12px;background:#f8f9fa;border-radius:8px">
        <div class="small" style="color:#666;margin-bottom:4px">Boxes Count</div>
        <div style="font-size:20px;font-weight:bold;color:#6c757d">${eod.boxes}</div>
      </div>
    </div>
    
    <div style="padding:16px;background:#e8f5e9;border-radius:8px;margin-bottom:16px">
      <div class="small" style="color:#666;margin-bottom:4px">Total Amount</div>
      <div style="font-size:28px;font-weight:bold;color:#28a745">$${eod.total.toFixed(2)}</div>
    </div>
    
    ${eod.notes ? `
      <hr style="border:none;border-top:1px solid #e0e0e0;margin:16px 0">
      <h3 style="margin:16px 0">Notes</h3>
      <div style="padding:12px;background:#fff3cd;border-left:4px solid #ffc107;border-radius:4px">
        <div style="white-space:pre-wrap">${eod.notes}</div>
      </div>
    ` : '<div class="small" style="color:#666;font-style:italic">No notes provided</div>'}
  `;
  
  container.appendChild(card);
  
  qs('backToListBtn').addEventListener('click', () => window.location = `store-eod-list.html?store=${storeId}`);
}

// Ensure nav logout binds globally
window.logoutApp = logoutApp;
