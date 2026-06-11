/* ============================================================
   SCRIPT.JS — Sistem Pakar Penyakit Pencernaan
   Metode  : Forward Chaining
   Gejala  : 12 gejala gabungan (GA–GL)
   Penyakit: GERD, Sembelit, IBS, Apendisitis, Maag
   ============================================================ */

/* =====================================================
   BAGIAN 1: PETA GEJALA (GA–GL)
   Setiap kode gejala dipetakan ke teks lengkap
   untuk ditampilkan kembali di halaman hasil
   ===================================================== */
const GEJALA_MAP = {
  GA: '🔥 Rasa panas/nyeri di dada (heartburn) & asam naik ke kerongkongan',
  GB: '😣 Nyeri / perih di ulu hati, mual, dan perut kembung',
  GC: '🛌 Pola makan tidak teratur / langsung berbaring setelah makan',
  GD: '🍔 Gaya hidup tidak sehat: stres, kopi, alkohol, rokok, makanan pedas & asam',
  GE: '💊 Konsumsi obat yang mengiritasi lambung atau memperlambat usus',
  GF: '🚽 BAB < 3x seminggu dan / atau sulit BAB disertai kembung & begah',
  GG: '💧 Kurang minum air putih dan kurang konsumsi serat',
  GH: '🔄 Nyeri perut berkurang setelah BAB & pola BAB berubah-ubah',
  GI: '💦 Diare berulang tanpa disertai darah',
  GJ: '📍 Nyeri berpindah ke perut kanan bawah, makin hebat saat bergerak/ditekan',
  GK: '🤢 Mual, demam ringan, dan nafsu makan menurun drastis',
  GL: '🔴 Tanda peradangan pada dinding lambung atau area usus buntu',
};

/* =====================================================
   BAGIAN 2: BASIS PENGETAHUAN (Knowledge Base)
   Rules diperbarui menggunakan kode gejala baru GA–GL.
   ===================================================== */
const KNOWLEDGE_BASE = [

  /* ─── GERD ─────────────────────────────────────────── */
  {
    id         : 'GERD',
    name       : 'GERD',
    emoji      : '🔥',
    theme      : 'theme-gerd',
    rules      : [
      { gejala: ['GA'],         bobot: 50 },
      { gejala: ['GB'],         bobot: 25 },
      { gejala: ['GC'],         bobot: 20 },
      { gejala: ['GD'],         bobot: 20 },
      { gejala: ['GE'],         bobot: 15 },
      { gejala: ['GA', 'GC'],   bobot: 30 },
      { gejala: ['GA', 'GD'],   bobot: 28 },
      { gejala: ['GA', 'GB', 'GC'], bobot: 35 },
    ],
    maxBobot   : 223,
    description: 'GERD (Gastroesophageal Reflux Disease) adalah kondisi ketika asam lambung naik kembali ke kerongkongan secara berulang, menyebabkan iritasi dan peradangan pada dinding esofagus.',
    symptoms   : ['Heartburn (sensasi terbakar di dada)', 'Asam naik ke kerongkongan', 'Nyeri ulu hati & mual', 'Sesak napas ringan'],
    saran      : [
      'Hindari makan besar lalu langsung tidur',
      'Kurangi makanan berlemak, pedas, kopi, dan alkohol',
      'Tinggikan posisi kepala saat tidur',
      'Konsultasi dokter untuk antasida atau PPI',
    ],
  },

  /* ─── SEMBELIT ─────────────────────────────────────── */
  {
    id         : 'Sembelit',
    name       : 'Sembelit',
    emoji      : '🟤',
    theme      : 'theme-sembelit',
    rules      : [
      { gejala: ['GF'],         bobot: 55 },
      { gejala: ['GG'],         bobot: 40 },
      { gejala: ['GE'],         bobot: 20 },
      { gejala: ['GD'],         bobot: 15 },
      { gejala: ['GF', 'GG'],   bobot: 50 },
      { gejala: ['GF', 'GE'],   bobot: 25 },
    ],
    maxBobot   : 205,
    description: 'Sembelit (konstipasi) adalah gangguan di mana seseorang kesulitan buang air besar dengan frekuensi < 3 kali seminggu, feses keras, dan mengejan berlebihan.',
    symptoms   : ['BAB < 3 kali per minggu', 'Feses keras dan kering', 'Perut kembung & begah', 'Mengejan berlebihan saat BAB'],
    saran      : [
      'Minum air putih minimal 8 gelas per hari',
      'Perbanyak sayur, buah, dan makanan berserat',
      'Rutin olahraga ringan setiap hari',
      'Jangan menahan keinginan untuk BAB',
    ],
  },

  /* ─── IBS ──────────────────────────────────────────── */
  {
    id         : 'IBS',
    name       : 'IBS',
    emoji      : '🌀',
    theme      : 'theme-ibs',
    rules      : [
      { gejala: ['GH'],         bobot: 55 },
      { gejala: ['GI'],         bobot: 35 },
      { gejala: ['GB'],         bobot: 20 },
      { gejala: ['GD'],         bobot: 20 },
      { gejala: ['GH', 'GI'],   bobot: 50 },
      { gejala: ['GH', 'GD'],   bobot: 25 },
    ],
    maxBobot   : 205,
    description: 'IBS (Irritable Bowel Syndrome) adalah gangguan fungsional usus besar yang menyebabkan nyeri perut, kembung, dan perubahan pola BAB secara berulang tanpa kerusakan struktural pada usus.',
    symptoms   : ['Nyeri perut membaik setelah BAB', 'Diare tanpa darah', 'Pola BAB tidak teratur', 'Perut kembung & begah'],
    saran      : [
      'Identifikasi makanan pemicu dan hindari',
      'Kelola stres dengan relaksasi atau olahraga',
      'Konsumsi probiotik secara rutin',
      'Konsultasi dokter untuk terapi yang tepat',
    ],
  },

  /* ─── APENDISITIS ──────────────────────────────────── */
  {
    id         : 'Apendisitis',
    name       : 'Apendisitis',
    emoji      : '🔴',
    theme      : 'theme-apendisitis',
    rules      : [
      { gejala: ['GJ'],         bobot: 65 },
      { gejala: ['GL'],         bobot: 45 },
      { gejala: ['GK'],         bobot: 25 },
      { gejala: ['GJ', 'GL'],   bobot: 65 },
      { gejala: ['GJ', 'GK'],   bobot: 40 },
      { gejala: ['GJ', 'GL', 'GK'], bobot: 70 },
    ],
    maxBobot   : 310,
    description: 'Apendisitis adalah peradangan usus buntu (apendiks) yang merupakan kedaruratan medis. Jika tidak ditangani, usus buntu bisa pecah dan mengancam jiwa.',
    symptoms   : ['Nyeri berpindah dari pusar ke kanan bawah', 'Nyeri hebat saat bergerak atau ditekan', 'Mual, muntah, demam ringan', 'Nafsu makan menurun'],
    saran      : [
      '⚠️ SEGERA ke IGD rumah sakit terdekat!',
      'Jangan konsumsi obat pereda nyeri sembarangan',
      'Jangan menunda pemeriksaan medis',
      'Penanganan utama adalah operasi pengangkatan usus buntu',
    ],
  },

  /* ─── MAAG (GASTRITIS) ─────────────────────────────── */
  {
    id         : 'Maag',
    name       : 'Gastritis (Maag)',
    emoji      : '💛',
    theme      : 'theme-maag',
    rules      : [
      { gejala: ['GL'],         bobot: 40 },
      { gejala: ['GB'],         bobot: 40 },
      { gejala: ['GC'],         bobot: 30 },
      { gejala: ['GD'],         bobot: 25 },
      { gejala: ['GE'],         bobot: 20 },
      { gejala: ['GL', 'GB'],   bobot: 45 },
      { gejala: ['GB', 'GC'],   bobot: 35 },
      { gejala: ['GL', 'GB', 'GD'], bobot: 50 },
    ],
    maxBobot   : 285,
    description: 'Gastritis (Maag) adalah peradangan pada lapisan dinding lambung yang bisa bersifat akut atau kronis, umumnya dipicu oleh pola makan buruk, stres, atau infeksi bakteri H. pylori.',
    symptoms   : ['Nyeri dan perih di ulu hati', 'Perut kembung dan cepat kenyang', 'Mual dan tidak nafsu makan', 'Rasa tidak nyaman di perut bagian atas'],
    saran      : [
      'Makan dalam porsi kecil tapi lebih sering',
      'Hindari makanan pedas, asam, kopi, alkohol, dan rokok',
      'Minum antasida sesuai anjuran dokter',
      'Kelola stres agar tidak memperburuk gejala',
    ],
  },
];

/* =====================================================
   BAGIAN 3: MESIN INFERENSI — FORWARD CHAINING
   ===================================================== */
function forwardChaining(selectedGejala) {
  const faktaSet = new Set(selectedGejala);
  const hasilDiagnosa = [];

  KNOWLEDGE_BASE.forEach(penyakit => {
    let totalBobot = 0;

    penyakit.rules.forEach(rule => {
      const terpenuhi = rule.gejala.every(g => faktaSet.has(g));
      if (terpenuhi) totalBobot += rule.bobot;
    });

    const persentase = Math.min(
      Math.round((totalBobot / penyakit.maxBobot) * 100),
      99
    );

    hasilDiagnosa.push({
      id         : penyakit.id,
      name       : penyakit.name,
      emoji      : penyakit.emoji,
      theme      : penyakit.theme,
      persentase,
      description: penyakit.description,
      symptoms   : penyakit.symptoms,
      saran      : penyakit.saran,
    });
  });

  return hasilDiagnosa.sort((a, b) => b.persentase - a.persentase).slice(0, 3);
}

/* =====================================================
   BAGIAN 4: NAVIGASI HALAMAN
   ===================================================== */
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById(pageId);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

/* =====================================================
   BAGIAN 5: RENDER HALAMAN HASIL
   ===================================================== */
function renderHasil(selectedGejala, topDiagnosa) {
  /* ── 5A. Tampilkan gejala yang dipilih ── */
  const listEl = document.getElementById('selected-gejala-list');
  listEl.innerHTML = '';
  selectedGejala.forEach(kode => {
    const tag = document.createElement('span');
    tag.className = 'selected-gejala-tag';
    tag.textContent = GEJALA_MAP[kode] || kode;
    listEl.appendChild(tag);
  });

  /* ── 5B. Kartu persentase 3 teratas ── */
  const pctEl = document.getElementById('percentage-cards');
  pctEl.innerHTML = '';

  const adaHasil = topDiagnosa.some(d => d.persentase > 0);
  if (!adaHasil) {
    pctEl.innerHTML = `
      <p style="color:var(--text-light); text-align:center; padding:16px;">
        😕 Tidak ada kecocokan gejala yang kuat. Coba pilih lebih banyak gejala.
      </p>`;
  } else {
    topDiagnosa.forEach((d, idx) => {
      const card = document.createElement('div');
      card.className = `pct-card ${d.theme} ${idx === 0 ? 'rank-1' : ''}`;
      card.innerHTML = `
        <div class="pct-top">
          <span class="pct-name">${d.emoji} ${d.name}</span>
          <div style="display:flex; align-items:center; gap:10px;">
            ${idx === 0 ? '<span class="rank-badge">🏆 Teratas</span>' : ''}
            <span class="pct-value">${d.persentase}%</span>
          </div>
        </div>
        <div class="pct-bar-bg">
          <div class="pct-bar-fill" style="width:0%;" data-width="${d.persentase}%"></div>
        </div>`;
      pctEl.appendChild(card);
    });

    requestAnimationFrame(() => {
      setTimeout(() => {
        document.querySelectorAll('.pct-bar-fill').forEach(bar => {
          bar.style.width = bar.dataset.width;
        });
      }, 120);
    });
  }

  /* ── 5C. Penjelasan penyakit ── */
  const explEl = document.getElementById('disease-explanations');
  explEl.innerHTML = '';

  topDiagnosa.filter(d => d.persentase > 0).forEach(d => {
    const card = document.createElement('div');
    card.className = `disease-card ${d.theme}`;
    card.innerHTML = `
      <h4>${d.emoji} What is ${d.name}?</h4>
      <p>${d.description}</p>
      <div class="label">Gejala Umum</div>
      <ul>${d.symptoms.map(s => `<li>${s}</li>`).join('')}</ul>
      <div class="label">Saran & Penanganan</div>
      <ul>${d.saran.map(s => `<li>${s}</li>`).join('')}</ul>`;
    explEl.appendChild(card);
  });

  if (!adaHasil) {
    explEl.innerHTML = `<p style="color:var(--text-light); text-align:center;">Tidak ada penjelasan yang dapat ditampilkan.</p>`;
  }
}

/* =====================================================
   BAGIAN 6: SIMPAN GAMBAR DIAGNOSA
   ===================================================== */
async function saveGambarDiagnosa() {
  const btnSave  = document.getElementById('btn-save');
  const container = document.getElementById('hasil-container');

  btnSave.textContent = '⏳ Menyimpan...';
  btnSave.classList.add('loading');
  btnSave.disabled = true;

  try {
    const canvas = await html2canvas(container, {
      scale          : 2,
      backgroundColor: '#FFF8F3',
      useCORS        : true,
      logging        : false,
    });

    const link = document.createElement('a');
    link.download = `diagnosa-pencernaan-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  } catch (err) {
    console.error('Gagal menyimpan gambar:', err);
    alert('Maaf, gagal menyimpan gambar. Silakan coba lagi.');
  } finally {
    btnSave.textContent = '💾 Save Diagnosa';
    btnSave.classList.remove('loading');
    btnSave.disabled = false;
  }
}

/* =====================================================
   BAGIAN 7: RESET FORM
   ===================================================== */
function resetForm() {
  document.querySelectorAll('input[name="gejala"]').forEach(cb => cb.checked = false);
  document.getElementById('validation-msg').style.display = 'none';
}

/* =====================================================
   BAGIAN 8: EVENT LISTENERS (VERSI KUNCI FINAL - ANTI-BENTROK)
   ===================================================== */
document.addEventListener('DOMContentLoaded', () => {

  // 1. Tampilkan halaman landing saat pertama load
  showPage('page-landing');

  // 2. Tombol "Let's Start!" → halaman gejala
  const btnStart = document.getElementById('btn-start');
  if (btnStart) {
    btnStart.addEventListener('click', (e) => {
      e.stopPropagation(); // Mencegah efek klik tembus
      showPage('page-gejala');
    });
  }

  // 3. Tombol "← Kembali" di halaman gejala → balik ke halaman landing utama
  const btnBackToLanding = document.getElementById('btn-back-to-landing');
  if (btnBackToLanding) {
    btnBackToLanding.addEventListener('click', (e) => {
      e.stopPropagation(); // Mencegah efek klik tembus
      showPage('page-landing');
    });
  }

  // 4. Tombol "Ayo Diagnosa!" → validasi, proses, tampilkan hasil
  const btnDiagnosa = document.getElementById('btn-diagnosa');
  if (btnDiagnosa) {
    btnDiagnosa.addEventListener('click', () => {
      const selected = Array.from(
        document.querySelectorAll('input[name="gejala"]:checked')
      ).map(cb => cb.value);

      if (selected.length === 0) {
        const msg = document.getElementById('validation-msg');
        if (msg) {
          msg.style.display = 'block';
          msg.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setTimeout(() => { msg.style.display = 'none'; }, 4000);
        }
        return;
      }

      const msg = document.getElementById('validation-msg');
      if (msg) msg.style.display = 'none';

      const topDiagnosa = forwardChaining(selected);
      renderHasil(selected, topDiagnosa);
      showPage('page-hasil');
    });
  }

  // 5. Tombol "Halaman Utama" → landing + reset
  const btnHome = document.getElementById('btn-home');
  if (btnHome) {
    btnHome.addEventListener('click', () => {
      resetForm();
      showPage('page-landing');
    });
  }

  // 6. Tombol "Ulangi Diagnosa" → halaman gejala + reset
  const btnUlangi = document.getElementById('btn-ulangi');
  if (btnUlangi) {
    btnUlangi.addEventListener('click', () => {
      resetForm();
      showPage('page-gejala');
    });
  }

  // 7. Tombol "Save Diagnosa"
  const btnSave = document.getElementById('btn-save');
  if (btnSave) {
    btnSave.addEventListener('click', saveGambarDiagnosa);
  }
  /* =====================================================
   BAGIAN 9: CHATBOT — FAQ + Claude AI Fallback
   ===================================================== */

const FAQ_ANSWERS = {
  gerd: `🔥 <b>GERD</b> adalah kondisi asam lambung naik ke kerongkongan secara berulang.<br><br>
    <b>Gejala utama:</b> heartburn, asam naik, nyeri dada.<br>
    <b>Saran:</b> Hindari makan besar lalu langsung tidur, kurangi kopi & makanan pedas, tinggikan kepala saat tidur.`,

  ibs: `🌀 <b>IBS</b> (Irritable Bowel Syndrome) adalah gangguan fungsional usus besar.<br><br>
    <b>Gejala utama:</b> nyeri perut membaik setelah BAB, diare/sembelit bergantian, kembung.<br>
    <b>Saran:</b> Identifikasi makanan pemicu, kelola stres, konsumsi probiotik.`,

  maag: `💛 <b>Maag (Gastritis)</b> adalah peradangan dinding lambung.<br><br>
    <b>Gejala utama:</b> nyeri ulu hati, mual, perut kembung, cepat kenyang.<br>
    <b>Saran:</b> Makan porsi kecil tapi sering, hindari makanan pedas & asam, minum antasida sesuai anjuran dokter.`,

  sembelit: `🟤 <b>Sembelit</b> adalah kondisi BAB kurang dari 3x seminggu dengan feses keras.<br><br>
    <b>Gejala utama:</b> susah BAB, perut kembung, mengejan berlebihan.<br>
    <b>Saran:</b> Minum air putih minimal 8 gelas/hari, perbanyak serat, rutin olahraga ringan.`,

  apendisitis: `🔴 <b>Apendisitis</b> adalah radang usus buntu — kondisi darurat medis!<br><br>
    <b>Gejala utama:</b> nyeri berpindah ke perut kanan bawah, mual, demam ringan.<br>
    ⚠️ <b>Segera ke IGD rumah sakit terdekat!</b>`,

  saran: `Berikut saran umum menjaga kesehatan pencernaan:<br><br>
    ✅ Makan teratur & tidak terburu-buru<br>
    ✅ Minum air putih 8 gelas/hari<br>
    ✅ Perbanyak sayur & buah berserat<br>
    ✅ Kelola stres dengan baik<br>
    ✅ Hindari makanan pedas, asam, & berlemak berlebihan<br>
    ✅ Konsultasi dokter jika gejala berlanjut`,

  halo: `Halo! 👋 Saya asisten kesehatan pencernaan.<br>
    Kamu bisa tanya tentang: <b>GERD, IBS, Maag, Sembelit, Apendisitis</b>, atau minta <b>saran kesehatan pencernaan</b>.`,
};

function matchFAQ(pesan) {
  const p = pesan.toLowerCase();

  // Deteksi intent
  const isApa   = p.match(/\b(apa|apakah|pengertian|definisi|maksud|itu apa)\b/);
  const isCaraMencegah = p.match(/\b(mencegah|pencegahan|hindari|menghindari)\b/);
  const isSaran  = p.match(/\b(saran|tips|cara|mengobati|pengobatan|penanganan|treatment)\b/);
  const isHalo   = p.match(/\b(halo|hai|hi|hello|hey)\b/);

  // Deteksi penyakit
  const isGerd  = p.match(/\b(gerd|asam lambung|heartburn|refluks)\b/);
  const isIbs   = p.match(/\b(ibs|irritable|usus besar)\b/);
  const isMaag  = p.match(/\b(maag|gastritis|ulu hati)\b/);
  const isSembelit = p.match(/\b(sembelit|konstipasi|susah bab)\b/);
  const isApend = p.match(/\b(apendisitis|usus buntu|appendix)\b/);

  if (isHalo && !isGerd && !isIbs && !isMaag && !isSembelit && !isApend)
    return FAQ_ANSWERS.halo;

  // Kalau ada kata "cara mencegah/saran" + nama penyakit → lempar ke AI
  if ((isCaraMencegah || isSaran) && (isGerd || isIbs || isMaag || isSembelit || isApend))
    return null;

  // Kalau tanya pengertian / apa itu → jawab FAQ
  if (isGerd)       return FAQ_ANSWERS.gerd;
  if (isIbs)        return FAQ_ANSWERS.ibs;
  if (isMaag)       return FAQ_ANSWERS.maag;
  if (isSembelit)   return FAQ_ANSWERS.sembelit;
  if (isApend)      return FAQ_ANSWERS.apendisitis;

  // Saran umum (tanpa nama penyakit spesifik)
  if (isCaraMencegah || isSaran)
    return FAQ_ANSWERS.saran;

  return null;
}

async function kirimKeClaude(pesan, riwayat) {
  const systemPrompt = `Kamu adalah asisten kesehatan pencernaan yang ramah untuk aplikasi "Let's Diagnose Your Gut Problems!". 
Jawab pertanyaan seputar penyakit pencernaan (GERD, IBS, Maag, Sembelit, Apendisitis) dengan bahasa Indonesia yang mudah dipahami.
Selalu ingatkan pengguna untuk konsultasi dokter untuk diagnosis resmi. Jawab singkat dan padat (maksimal 3-4 kalimat).`;

  const messages = [
    ...riwayat.map(m => ({ role: m.role, content: m.content })),
    { role: 'user', content: pesan }
  ];

  const res = await fetch('/.netlify/functions/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages, system: systemPrompt }),
  });

  const data = await res.json();
  return data.text || 'Maaf, saya tidak bisa menjawab saat ini.';
}

function initChatbot() {
  const bubble   = document.getElementById('chat-bubble');
  const window_  = document.getElementById('chat-window');
  const closeBtn = document.getElementById('chat-close');
  const input    = document.getElementById('chat-input');
  const sendBtn  = document.getElementById('chat-send');
  const messages = document.getElementById('chat-messages');

  if (!bubble) return;

  let riwayat = [];
  let isOpen  = false;

  function toggleChat() {
    isOpen = !isOpen;
    window_.style.display = isOpen ? 'flex' : 'none';
    bubble.style.display  = isOpen ? 'none' : 'flex';
    if (isOpen && messages.children.length === 0) {
      appendMessage('bot', 'Halo! 👋 Saya asisten pencernaan kamu. Tanya apa saja tentang GERD, IBS, Maag, Sembelit, atau Apendisitis ya!');
    }
  }

  function appendMessage(role, html) {
    const div = document.createElement('div');
    div.className = `chat-msg chat-msg-${role}`;
    div.innerHTML = html;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  function showLoading() {
    const div = document.createElement('div');
    div.className = 'chat-msg chat-msg-bot chat-loading';
    div.id = 'chat-loading';
    div.innerHTML = '<span></span><span></span><span></span>';
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  function removeLoading() {
    const el = document.getElementById('chat-loading');
    if (el) el.remove();
  }

  async function handleSend() {
    const teks = input.value.trim();
    if (!teks) return;

    input.value = '';
    sendBtn.disabled = true;
    appendMessage('user', teks);

    const faqJawaban = matchFAQ(teks);
    if (faqJawaban) {
      setTimeout(() => {
        appendMessage('bot', faqJawaban);
        sendBtn.disabled = false;
      }, 400);
      return;
    }

    showLoading();
    try {
      const jawaban = await kirimKeClaude(teks, riwayat);
      riwayat.push({ role: 'user', content: teks });
      riwayat.push({ role: 'assistant', content: jawaban });
      if (riwayat.length > 10) riwayat = riwayat.slice(-10);
      removeLoading();
      appendMessage('bot', jawaban);
    } catch {
      removeLoading();
      appendMessage('bot', '⚠️ Koneksi gagal. Pastikan kamu terhubung ke internet dan coba lagi.');
    } finally {
      sendBtn.disabled = false;
    }
  }

  bubble.addEventListener('click', toggleChat);
  closeBtn.addEventListener('click', toggleChat);
  sendBtn.addEventListener('click', handleSend);
  input.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } });
}

initChatbot();
});