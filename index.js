const CLOCK_SPEED_HZ = 4;

const HLT = 1 << 15; // Halt clock
const MI = 1 << 14; // Memory address register in
const RI = 1 << 13; // RAM data in
const RO = 1 << 12; // RAM data out
const IO = 1 << 11; // Instruction register out
const II = 1 << 10; // Instruction register in
const AI = 1 << 9; // A register in
const AO = 1 << 8; // A register out
const EO = 1 << 7; // ALU out
const SU = 1 << 6; // ALU subtract
const BI = 1 << 5; // B register in
const OI = 1 << 4; // Output register in
const CE = 1 << 3; // Program counter enable
const CO = 1 << 2; // Program counter out
const J = 1 << 1; // Jump (program counter in)
const FI = 1 << 0; // Flags in

const CONTROL_WORD_MAP = [
  [
    // NOP
    [CO | MI, CO | MI, CO | MI, CO | MI],
    [RO | II | CE, RO | II | CE, RO | II | CE, RO | II | CE],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  [
    // LDA
    [CO | MI, CO | MI, CO | MI, CO | MI],
    [RO | II | CE, RO | II | CE, RO | II | CE, RO | II | CE],
    [IO | MI, IO | MI, IO | MI, IO | MI],
    [RO | AI, RO | AI, RO | AI, RO | AI],
    [0, 0, 0, 0],
  ],
  [
    // ADD
    [CO | MI, CO | MI, CO | MI, CO | MI],
    [RO | II | CE, RO | II | CE, RO | II | CE, RO | II | CE],
    [IO | MI, IO | MI, IO | MI, IO | MI],
    [RO | BI, RO | BI, RO | BI, RO | BI],
    [EO | AI | FI, EO | AI | FI, EO | AI | FI, EO | AI | FI],
  ],
  [
    // SUB
    [CO | MI, CO | MI, CO | MI, CO | MI],
    [RO | II | CE, RO | II | CE, RO | II | CE, RO | II | CE],
    [IO | MI, IO | MI, IO | MI, IO | MI],
    [RO | BI, RO | BI, RO | BI, RO | BI],
    [
      EO | AI | FI | SU,
      EO | AI | FI | SU,
      EO | AI | FI | SU,
      EO | AI | FI | SU,
    ],
  ],
  [
    // STA
    [CO | MI, CO | MI, CO | MI, CO | MI],
    [RO | II | CE, RO | II | CE, RO | II | CE, RO | II | CE],
    [IO | MI, IO | MI, IO | MI, IO | MI],
    [AO | RI, AO | RI, AO | RI, AO | RI],
    [0, 0, 0, 0],
  ],
  [
    // LDI
    [CO | MI, CO | MI, CO | MI, CO | MI],
    [RO | II | CE, RO | II | CE, RO | II | CE, RO | II | CE],
    [IO | AI, IO | AI, IO | AI, IO | AI],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  [
    // JMP
    [CO | MI, CO | MI, CO | MI, CO | MI],
    [RO | II | CE, RO | II | CE, RO | II | CE, RO | II | CE],
    [IO | J, IO | J, IO | J, IO | J],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  [
    // JC
    [CO | MI, CO | MI, CO | MI, CO | MI],
    [RO | II | CE, RO | II | CE, RO | II | CE, RO | II | CE],
    [0, 0, IO | J, IO | J],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  [
    // JZ
    [CO | MI, CO | MI, CO | MI, CO | MI],
    [RO | II | CE, RO | II | CE, RO | II | CE, RO | II | CE],
    [0, IO | J, 0, IO | J],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  [
    // -
    [CO | MI, CO | MI, CO | MI, CO | MI],
    [RO | II | CE, RO | II | CE, RO | II | CE, RO | II | CE],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  [
    // -
    [CO | MI, CO | MI, CO | MI, CO | MI],
    [RO | II | CE, RO | II | CE, RO | II | CE, RO | II | CE],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  [
    // -
    [CO | MI, CO | MI, CO | MI, CO | MI],
    [RO | II | CE, RO | II | CE, RO | II | CE, RO | II | CE],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  [
    // -
    [CO | MI, CO | MI, CO | MI, CO | MI],
    [RO | II | CE, RO | II | CE, RO | II | CE, RO | II | CE],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  [
    // -
    [CO | MI, CO | MI, CO | MI, CO | MI],
    [RO | II | CE, RO | II | CE, RO | II | CE, RO | II | CE],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  [
    // OUT
    [CO | MI, CO | MI, CO | MI, CO | MI],
    [RO | II | CE, RO | II | CE, RO | II | CE, RO | II | CE],
    [AO | OI, AO | OI, AO | OI, AO | OI],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  [
    // HLT
    [CO | MI, CO | MI, CO | MI, CO | MI],
    [RO | II | CE, RO | II | CE, RO | II | CE, RO | II | CE],
    [HLT, HLT, HLT, HLT],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
];

const nop = () => 0x00;
const lda = (data) => 0x10 | data;
const add = (data) => 0x20 | data;
const sub = (data) => 0x30 | data;
const sta = (data) => 0x40 | data;
const ldi = (data) => 0x50 | data;
const jmp = (data) => 0x60 | data;
const jc = (data) => 0x70 | data;
const jz = (data) => 0x80 | data;
const out = () => 0xe0;
const hlt = () => 0xf0;

let clockIsEnabled = true;
let memory = [
  out(),
  add(15),
  jc(4),
  jmp(0),
  sub(15),
  out(),
  jz(0),
  jmp(4),
  0x00,
  0x00,
  0x00,
  0x00,
  0x00,
  0x00,
  0x00,
  0x01,
];
let address = 0x0;
let instruction = 0x00;
let step = 0x0;
let flags = 0x0;
let pc = 0x0;
let a = 0x00;
let b = 0x00;
let alu = 0x00;
let display = 0x00;
let dataBus = 0x00;
let controlWord = CONTROL_WORD_MAP[0][0][0];
let clock = true;

function sleep(durationInMs) {
  return new Promise((resolve) => setTimeout(resolve, durationInMs));
}

function pulseClock() {
  console.log('Clock');
}

function printBin(n) {
  let string = '';

  for (let i = 8; i >= 0; i--) {
    string += (n & (1 << i)) > 0 ? '1' : '0';
    if (i === 8 || i === 4) string += ' ';
  }

  console.log(n, string);
}

function subBin(a, b) {
  const sub = a - b;
  const carry = (sub & 0x100) > 0;
  const zero = sub === 0;
  return [sub & 0xff, parseInt(`${carry ? '1' : '0'}${zero ? '1' : '0'}`, 2)];
}

function addBin(a, b) {
  const sum = a + b;
  const carry = (sum & 0x100) > 0;
  const zero = (flags & 0x01) > 0;
  return [sum % 256, parseInt(`${carry ? '1' : '0'}${zero ? '1' : '0'}`, 2)];
}

function printControlWord() {
  let microInstructions = [];

  if (HLT & controlWord) microInstructions.push('HLT');
  if (MI & controlWord) microInstructions.push('MI');
  if (RI & controlWord) microInstructions.push('RI');
  if (RO & controlWord) microInstructions.push('RO');
  if (IO & controlWord) microInstructions.push('IO');
  if (II & controlWord) microInstructions.push('II');
  if (AI & controlWord) microInstructions.push('AI');
  if (AO & controlWord) microInstructions.push('AO');
  if (EO & controlWord) microInstructions.push('EO');
  if (SU & controlWord) microInstructions.push('SU');
  if (BI & controlWord) microInstructions.push('BI');
  if (OI & controlWord) microInstructions.push('OI');
  if (CE & controlWord) microInstructions.push('CE');
  if (CO & controlWord) microInstructions.push('CO');
  if (J & controlWord) microInstructions.push('J');
  if (FI & controlWord) microInstructions.push('FI');

  if (microInstructions.length === 0) return 'NOP';

  return microInstructions.join(' | ');
}

function printInstruction() {
  const ops = [
    'NOP',
    'ADD',
    'SUB',
    'STA',
    'LDI',
    'JMP',
    'JC',
    'JZ',
    '',
    '',
    '',
    '',
    '',
    '',
    'OUT',
    'HLT',
  ];

  return `${ops[instruction >> 4]} ${instruction & 0x0f}`;
}

async function runCpu() {
  while (clockIsEnabled) {
    let isSub = false;
    clock = true;

    if (HLT & controlWord) {
      clockIsEnabled = false;
      return;
    }
    if (SU & controlWord) isSub = true;
    if (RO & controlWord) dataBus = memory[address];
    else if (IO & controlWord) dataBus = instruction & 0x0f;
    else if (AO & controlWord) dataBus = a;
    else if (CO & controlWord) dataBus = pc;
    else if (EO & controlWord) {
      const [result, newFlags] = isSub ? subBin(a, b) : addBin(a, b);
      dataBus = result;
      if (FI & controlWord) flags = newFlags;
    }
    if (MI & controlWord) address = dataBus & 0x0f;
    else if (RI & controlWord) memory[address] = dataBus;
    else if (II & controlWord) instruction = dataBus;
    else if (AI & controlWord) a = dataBus;
    else if (BI & controlWord) b = dataBus;
    if (J & controlWord) pc = instruction & 0x0f;
    if (CE & controlWord) pc = (pc + 1) % 16;
    if (OI & controlWord) display = a;

    const [result] = isSub ? subBin(a, b) : addBin(a, b);
    alu = result;

    await sleep(1000 / CLOCK_SPEED_HZ / 2);

    clock = false;
    step = (step + 1) % 5;
    const opCode = instruction >> 4;
    controlWord = CONTROL_WORD_MAP[opCode][step][flags];

    await sleep(1000 / CLOCK_SPEED_HZ / 2);
  }
}

function setup() {
  createCanvas(1040, 580);
  runCpu();
}

function draw() {
  const dark = '#1f2937';
  const gray = '#374151';
  const red = '#ef4444';
  const green = '#22c55e';
  const blue = '#3b82f6';
  const yellow = '#f59e0b';
  const white = '#ffffff';

  background(dark);
  noStroke();

  function drawBits(nBits, data, color, x, y, radius = 20) {
    for (let i = 0; i < nBits; i++) {
      fill((1 << i) & data ? color : gray);
      circle(x + 25 * (nBits - i), y, radius);
    }
  }

  // Clock
  textFont('monospace');
  textSize(24);
  fill(white);
  text('Clock', 15, 20);
  fill(clock ? blue : gray);
  circle(25, 40, 20);

  // Address
  fill(white);
  text('Address ' + address, 15, 100);
  drawBits(4, address, yellow, 0, 120);

  // Memory
  fill(white);
  text('Memory content ' + memory[address], 15, 180);
  drawBits(8, memory[address], red, 0, 200);

  // Step
  fill(white);
  text('Step ' + step, 15, 260);
  drawBits(3, step, red, 0, 280);

  // Instruction
  fill(white);
  text('Instruction ' + printInstruction(), 15, 340);
  drawBits(4, instruction >> 4, blue, 0, 360);
  drawBits(4, instruction & 0x0f, yellow, 100, 360);

  stroke(gray);
  line(315, 20, 315, 400);
  noStroke();

  // Data Bus
  fill(white);
  text('Data Bus ' + dataBus, 355, 20);
  drawBits(8, dataBus, red, 340, 40);

  stroke(gray);
  line(590, 20, 590, 550);
  noStroke();

  // Program Counter
  fill(white);
  text('Program Counter ' + pc, 630, 20);
  drawBits(4, pc, green, 615, 40);

  // Flags
  fill(white);
  text(`Flags ${flags >> 1} ${flags & 0x1}`, 630, 100);
  drawBits(2, flags, green, 615, 120);

  // A
  fill(white);
  text('A Register ' + a, 630, 180);
  drawBits(8, a, red, 615, 200);

  // ALU
  fill(white);
  text('ALU ' + alu, 630, 260);
  drawBits(8, alu, red, 615, 280);

  // B
  fill(white);
  text('B Register ' + b, 630, 340);
  drawBits(8, b, red, 615, 360);

  // Output
  fill(red);
  textSize(40);
  text(display, 750, 420);
  fill(white);
  textSize(24);
  text('Display', 630, 420);

  // Control Word
  fill(white);
  textSize(24);
  text('Control Word', 630, 480);
  drawBits(16, controlWord, blue, 615, 500);
  fill(white);
  text(printControlWord(), 630, 540);
}
