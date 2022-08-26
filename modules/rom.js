import {
  HLT,
  MI,
  RI,
  RO,
  IO,
  II,
  AI,
  AO,
  EO,
  SU,
  BI,
  OI,
  CE,
  CO,
  J,
  FI,
} from './micro-instructions.js';

export default [
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
