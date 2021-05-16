import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import * as tf from '@tensorflow/tfjs';

const flat_array = [
  -0.8360327751774613, 0.012857754636649166, -0.8360327751774613,
  0.012857754636649166, 0.8617482844507597, 0.012857754636649166,
  0.012857754636649166, -0.8360327751774613, -0.8360327751774613,
  0.012857754636649166, 0.8617482844507597, 2.5595293440789804,
  0.012857754636649166, 0.012857754636649166, -0.8360327751774613,
  0.012857754636649166, 0.012857754636649166, 0.8617482844507597,
  -0.8360327751774613, 1.71063881426487, 0.012857754636649166,
  -0.8360327751774613, 0.8617482844507597, -0.8360327751774613,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  0.012857754636649166, -0.8360327751774613, -0.8360327751774613,
  -0.8360327751774613, 0.012857754636649166, 0.012857754636649166,
  0.8617482844507597, 0.012857754636649166, -0.8360327751774613,
  -0.8360327751774613, 0.012857754636649166, -0.8360327751774613,
  -0.8360327751774613, 0.012857754636649166, 0.8617482844507597,
  -0.8360327751774613, -0.8360327751774613, 0.012857754636649166,
  -0.8360327751774613, 0.012857754636649166, 1.71063881426487,
  0.012857754636649166, -0.8360327751774613, -0.8360327751774613,
  -0.8360327751774613, 0.012857754636649166, -0.8360327751774613,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  -0.8360327751774613, 0.8617482844507597, 0.012857754636649166,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  -0.8360327751774613, 0.012857754636649166, 0.012857754636649166,
  0.8617482844507597, 1.71063881426487, -0.8360327751774613, 0.8617482844507597,
  1.71063881426487, 0.012857754636649166, -0.8360327751774613,
  0.8617482844507597, 0.012857754636649166, -0.8360327751774613,
  0.012857754636649166, -0.8360327751774613, 0.012857754636649166,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  -0.8360327751774613, 0.012857754636649166, 1.71063881426487,
  0.012857754636649166, -0.8360327751774613, -0.8360327751774613,
  0.012857754636649166, 0.8617482844507597, 0.012857754636649166,
  -0.8360327751774613, 0.012857754636649166, 0.012857754636649166,
  2.5595293440789804, 4.257310403707201, 4.257310403707201, 1.71063881426487,
  -0.8360327751774613, 0.012857754636649166, 0.3166311606262052,
  1.4692950964298719, 4.927286903840871, 1.4692950964298719, 1.4692950964298719,
  2.621959032233538, -0.8360327751774613, 1.4692950964298719,
  1.4692950964298719, -0.8360327751774613, 1.4692950964298719,
  3.774622968037205, 0.3166311606262052, -0.8360327751774613,
  0.3166311606262052, -0.8360327751774613, -0.8360327751774613,
  -0.8360327751774613, -0.8360327751774613, 0.3166311606262052,
  0.3166311606262052, -0.8360327751774613, -0.8360327751774613,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  -0.8360327751774613, 0.3166311606262052, 1.4692950964298719,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  0.3166311606262052, 0.3166311606262052, -0.8360327751774613,
  0.3166311606262052, 0.3166311606262052, 0.3166311606262052,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  2.621959032233538, 0.3166311606262052, 0.3166311606262052,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  -0.8360327751774613, -0.8360327751774613, 0.3166311606262052,
  0.3166311606262052, 0.3166311606262052, -0.8360327751774613,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  0.3166311606262052, 0.3166311606262052, -0.8360327751774613,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  -0.8360327751774613, 1.4692950964298719, 1.4692950964298719,
  0.3166311606262052, -0.8360327751774613, -0.8360327751774613,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  -0.8360327751774613, 0.3166311606262052, 0.3166311606262052,
  0.3166311606262052, -0.8360327751774613, -0.8360327751774613,
  1.4692950964298719, 0.3166311606262052, 0.3166311606262052,
  -0.8360327751774613, 0.3166311606262052, -0.8360327751774613,
  0.3166311606262052, 0.3166311606262052, 0.3166311606262052,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  -0.8360327751774613, 0.3166311606262052, -0.8360327751774613,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  0.8653567498597962, 0.8653567498597962, 3.417441037415682,
  0.014661987341167429, 1.7160515123784243, 0.8653567498597962,
  2.5667462748970538, 1.7160515123784243, 1.7160515123784243,
  -0.8360327751774613, 0.014661987341167429, -0.8360327751774613,
  0.8653567498597962, 1.7160515123784243, 0.8653567498597962,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  0.8653567498597962, 1.7160515123784243, 0.8653567498597962,
  -0.8360327751774613, 0.8653567498597962, 1.7160515123784243,
  1.7160515123784243, 0.8653567498597962, 0.014661987341167429,
  3.417441037415682, 0.014661987341167429, 0.014661987341167429,
  0.8653567498597962, 0.014661987341167429, -0.8360327751774613,
  1.7160515123784243, 0.8653567498597962, 0.014661987341167429,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  -0.8360327751774613, 0.014661987341167429, 0.014661987341167429,
  -0.8360327751774613, -0.8360327751774613, 0.014661987341167429,
  0.014661987341167429, -0.8360327751774613, 0.014661987341167429,
  0.014661987341167429, 0.014661987341167429, 0.014661987341167429,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  0.014661987341167429, 0.014661987341167429, 0.014661987341167429,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  0.014661987341167429, 0.014661987341167429, 0.014661987341167429,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  0.014661987341167429, 0.014661987341167429, 1.7160515123784243,
  0.014661987341167429, 0.014661987341167429, -0.8360327751774613,
  0.014661987341167429, -0.8360327751774613, -0.8360327751774613,
  -0.8360327751774613, 0.014661987341167429, 0.014661987341167429,
  -0.8360327751774613, 0.014661987341167429, 0.014661987341167429,
  0.014661987341167429, 0.014661987341167429, -0.8360327751774613,
  -0.8360327751774613, 0.014661987341167429, 0.014661987341167429,
  1.7160515123784243, -0.8360327751774613, -0.8360327751774613,
  -0.8360327751774613, 0.014661987341167429, -0.8360327751774613,
  -0.7766096575274456, -0.5983403045773986, -0.6577634222274144,
  -0.7766096575274456, -0.36064783397733596, -0.2418015986773046,
  0.11473710722278943, 0.6495451660729303, 0.23358334252282068,
  0.2930064601728364, 1.1249301072730558, 2.907623636773526, 3.501854813273682,
  4.333778460373902, 4.2743553427238865, 4.155509107423855, 4.928009636874059,
  2.491661813223416, 0.8872376366729933, -0.12295536337727327,
  -0.06353224572725763, -0.06353224572725763, -0.36064783397733596,
  -0.5389171869273829, -0.7766096575274456, -0.8360327751774613,
  -0.8360327751774613, -0.7766096575274456, -0.7766096575274456,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  -0.7766096575274456, -0.7766096575274456, -0.7766096575274456,
  -0.7766096575274456, -0.8360327751774613, -0.71718653987743,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  -0.7766096575274456, -0.8360327751774613, -0.8360327751774613,
  -0.7766096575274456, -0.8360327751774613, -0.8360327751774613,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  -0.8360327751774613, -0.8360327751774613, -0.7766096575274456,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  -0.8360327751774613, -0.8360327751774613, -0.71718653987743,
  -0.71718653987743, -0.8360327751774613, -0.8360327751774613,
  -0.7766096575274456, -0.7766096575274456, -0.7766096575274456,
  -0.7766096575274456, -0.7766096575274456, -0.8360327751774613,
  -0.8360327751774613, -0.8360327751774613, -0.7766096575274456,
  -0.7766096575274456, -0.8360327751774613, -0.8360327751774613,
  -0.8360327751774613, -0.8360327751774613, -0.7766096575274456,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  -0.8360327751774613, -0.8360327751774613, -0.7766096575274456,
  -0.8360327751774613, -0.71718653987743, -0.7766096575274456,
  -0.8360327751774613, -0.71718653987743, -0.8360327751774613,
  -0.8360327751774613, 0.3398259183527028, 0.3398259183527028,
  0.3398259183527028, -0.8360327751774613, 0.3398259183527028,
  1.5156846118828669, -0.8360327751774613, -0.8360327751774613,
  0.3398259183527028, 0.3398259183527028, -0.8360327751774613,
  0.3398259183527028, 0.3398259183527028, -0.8360327751774613,
  -0.8360327751774613, 0.3398259183527028, 1.5156846118828669,
  0.3398259183527028, -0.8360327751774613, -0.8360327751774613,
  0.3398259183527028, 1.5156846118828669, 1.5156846118828669,
  0.3398259183527028, 2.6915433054130307, 2.6915433054130307,
  -0.8360327751774613, 1.5156846118828669, 1.5156846118828669,
  0.3398259183527028, 0.3398259183527028, 1.5156846118828669,
  0.3398259183527028, -0.8360327751774613, -0.8360327751774613,
  0.3398259183527028, -0.8360327751774613, 0.3398259183527028,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  -0.8360327751774613, 0.3398259183527028, 0.3398259183527028,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  1.5156846118828669, 1.5156846118828669, -0.8360327751774613,
  -0.8360327751774613, -0.8360327751774613, 0.3398259183527028,
  0.3398259183527028, 1.5156846118828669, -0.8360327751774613,
  -0.8360327751774613, 0.3398259183527028, -0.8360327751774613,
  -0.8360327751774613, 1.5156846118828669, -0.8360327751774613,
  0.3398259183527028, 1.5156846118828669, -0.8360327751774613,
  -0.8360327751774613, -0.8360327751774613, 0.3398259183527028,
  0.3398259183527028, 0.3398259183527028, 0.3398259183527028,
  1.5156846118828669, 0.3398259183527028, 0.3398259183527028,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  0.3398259183527028, -0.8360327751774613, 1.5156846118828669,
  0.3398259183527028, -0.8360327751774613, -0.8360327751774613,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  1.5156846118828669, 0.3398259183527028, 0.3398259183527028,
  0.3398259183527028, 0.3398259183527028, 0.3398259183527028,
  -0.8360327751774613, 2.6915433054130307, -0.8360327751774613,
];

const flat_array2 = [
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  0.11255339375584755, -0.8360327751774613, -0.8360327751774613,
  -0.8360327751774613, 0.11255339375584755, -0.8360327751774613,
  0.11255339375584755, 0.11255339375584755, -0.8360327751774613,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  0.11255339375584755, 0.11255339375584755, -0.8360327751774613,
  0.11255339375584755, 2.009725731622465, 1.0611395626891564,
  0.11255339375584755, 2.009725731622465, 2.009725731622465,
  0.11255339375584755, 0.11255339375584755, 0.11255339375584755,
  -0.8360327751774613, 1.0611395626891564, 2.009725731622465,
  1.0611395626891564, -0.8360327751774613, 0.11255339375584755,
  0.11255339375584755, 0.11255339375584755, 0.11255339375584755,
  0.11255339375584755, 0.11255339375584755, -0.8360327751774613,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  0.11255339375584755, 0.11255339375584755, 0.11255339375584755,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  0.11255339375584755, -0.8360327751774613, -0.8360327751774613,
  0.11255339375584755, -0.8360327751774613, -0.8360327751774613,
  2.009725731622465, 0.11255339375584755, -0.8360327751774613,
  0.11255339375584755, -0.8360327751774613, 0.11255339375584755,
  0.11255339375584755, 1.0611395626891564, 1.0611395626891564,
  -0.8360327751774613, 1.0611395626891564, 2.009725731622465,
  0.11255339375584755, -0.8360327751774613, 0.11255339375584755,
  -0.8360327751774613, -0.8360327751774613, 0.11255339375584755,
  2.009725731622465, 1.0611395626891564, -0.8360327751774613,
  1.0611395626891564, 0.11255339375584755, 0.11255339375584755,
  -0.8360327751774613, 2.009725731622465, 0.11255339375584755,
  1.0611395626891564, 2.009725731622465, 1.0611395626891564,
  -0.8360327751774613, 1.0611395626891564, 2.009725731622465,
  0.11255339375584755, 0.11255339375584755, 0.11255339375584755,
  2.009725731622465, 2.009725731622465, 0.11255339375584755,
  0.11255339375584755, 2.5595293440789804, 0.8617482844507597,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  -0.8360327751774613, 0.8617482844507597, -0.8360327751774613,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  -0.8360327751774613, 0.8617482844507597, -0.8360327751774613,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  -0.8360327751774613, 2.5595293440789804, 0.8617482844507597,
  0.8617482844507597, -0.8360327751774613, -0.8360327751774613,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  -0.8360327751774613, 2.5595293440789804, 0.8617482844507597,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  0.8617482844507597, 0.8617482844507597, -0.8360327751774613,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  2.5595293440789804, 0.8617482844507597, 2.5595293440789804,
  2.5595293440789804, 0.8617482844507597, -0.8360327751774613,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  2.5595293440789804, 0.8617482844507597, -0.8360327751774613,
  -0.8360327751774613, 0.8617482844507597, 0.8617482844507597,
  0.8617482844507597, -0.8360327751774613, -0.8360327751774613,
  -0.8360327751774613, 2.5595293440789804, -0.8360327751774613,
  0.8617482844507597, -0.8360327751774613, -0.8360327751774613,
  0.8617482844507597, -0.8360327751774613, -0.8360327751774613,
  2.5595293440789804, -0.8360327751774613, -0.8360327751774613,
  0.8617482844507597, 0.8617482844507597, 0.8617482844507597,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  -0.8360327751774613, 2.5595293440789804, 0.10024955034740035,
  1.9728142013971237, -0.8360327751774613, -0.8360327751774613,
  -0.8360327751774613, 1.0365318758722621, 3.8453788524468466,
  1.9728142013971237, 0.10024955034740035, -0.8360327751774613,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  -0.8360327751774613, 1.0365318758722621, 0.10024955034740035,
  0.10024955034740035, 0.10024955034740035, -0.8360327751774613,
  -0.8360327751774613, 0.10024955034740035, 0.10024955034740035,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  0.10024955034740035, 1.0365318758722621, -0.8360327751774613,
  -0.8360327751774613, 0.10024955034740035, -0.8360327751774613,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  0.10024955034740035, -0.8360327751774613, -0.8360327751774613,
  -0.8360327751774613, -0.8360327751774613, 0.10024955034740035,
  0.10024955034740035, -0.8360327751774613, -0.8360327751774613,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  -0.8360327751774613, -0.8360327751774613, 0.10024955034740035,
  1.0365318758722621, -0.8360327751774613, 1.0365318758722621,
  0.10024955034740035, -0.8360327751774613, 0.10024955034740035,
  0.10024955034740035, -0.8360327751774613, -0.8360327751774613,
  -0.8360327751774613, 1.9728142013971237, 1.9728142013971237,
  3.8453788524468466, 0.10024955034740035, -0.8360327751774613,
  0.10024955034740035, 0.10024955034740035, 1.0365318758722621,
  -0.8360327751774613, 0.10024955034740035, 1.0365318758722621,
  0.10024955034740035, -0.8360327751774613, 1.0365318758722621,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  0.10024955034740035, 0.10024955034740035, 0.10024955034740035,
  1.0365318758722621, 1.9728142013971237, 1.0365318758722621,
  1.0365318758722621, 0.10024955034740035, 0.10024955034740035,
  0.10024955034740035, 0.10024955034740035, 1.9728142013971237,
  -0.8360327751774613, 1.0365318758722621, 1.0365318758722621,
  1.0365318758722621, -0.8360327751774613, -0.8360327751774613,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  1.0365318758722621, 0.10024955034740035, 0.10024955034740035,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  -0.8360327751774613, 1.7721479782175722, -0.8360327751774613,
  -0.8360327751774613, 1.7721479782175722, 1.7721479782175722,
  1.7721479782175722, -0.8360327751774613, 1.7721479782175722,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  -0.8360327751774613, -0.8360327751774613, 1.7721479782175722,
  1.7721479782175722, 1.7721479782175722, -0.8360327751774613,
  -0.8360327751774613, -0.8360327751774613, 1.7721479782175722,
  1.7721479782175722, -0.8360327751774613, -0.8360327751774613,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  -0.8360327751774613, -0.8360327751774613, 1.7721479782175722,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  -0.8360327751774613, -0.8360327751774613, 1.7721479782175722,
  1.7721479782175722, -0.8360327751774613, -0.8360327751774613,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  -0.8360327751774613, 1.7721479782175722, -0.8360327751774613,
  -0.8360327751774613, -0.8360327751774613, 1.7721479782175722,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  -0.8360327751774613, -0.8360327751774613, 1.7721479782175722,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  -0.8360327751774613, 1.7721479782175722, 1.7721479782175722,
  1.7721479782175722, 1.7721479782175722, 1.7721479782175722, 4.380328731612606,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  -0.8360327751774613, 0.4949488920653798, -0.8360327751774613,
  -0.8360327751774613, -0.8360327751774613, 0.4949488920653798,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  0.4949488920653798, -0.8360327751774613, -0.8360327751774613,
  0.4949488920653798, 0.4949488920653798, -0.8360327751774613,
  0.4949488920653798, 1.8259305593082211, 1.8259305593082211,
  1.8259305593082211, 0.4949488920653798, -0.8360327751774613,
  -0.8360327751774613, 0.4949488920653798, -0.8360327751774613,
  -0.8360327751774613, 0.4949488920653798, -0.8360327751774613,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  -0.8360327751774613, 0.4949488920653798, 0.4949488920653798,
  0.4949488920653798, -0.8360327751774613, -0.8360327751774613,
  -0.8360327751774613, 0.4949488920653798, -0.8360327751774613,
  -0.8360327751774613, -0.8360327751774613, 1.8259305593082211,
  -0.8360327751774613, 0.4949488920653798, -0.8360327751774613,
  0.4949488920653798, -0.8360327751774613, -0.8360327751774613,
  1.8259305593082211, -0.8360327751774613, -0.8360327751774613,
  -0.8360327751774613, 0.4949488920653798, -0.8360327751774613,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  0.4949488920653798, 1.8259305593082211, -0.8360327751774613,
  1.8259305593082211, -0.8360327751774613, 0.4949488920653798,
  4.487893893793903, 0.4949488920653798, 0.4949488920653798, 1.8259305593082211,
  -0.8360327751774613, 1.8259305593082211, 1.8259305593082211,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  -0.8360327751774613, -0.8360327751774613, 0.4949488920653798,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  -0.8360327751774613, -0.8360327751774613, 0.4949488920653798,
  -0.8360327751774613, 1.8259305593082211, 0.4949488920653798,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
  1.8259305593082211, -0.8360327751774613, -0.8360327751774613,
  -0.8360327751774613, -0.8360327751774613, 3.1569122265510616,
  -0.8360327751774613, -0.8360327751774613, -0.8360327751774613,
];
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  async predict() {
    // Load our saved model from current directory (which will be
    // hosted via Firebase Hosting)
    // Relative URL provided for my-model.json.
    const model = await tf.loadLayersModel(
      'assets/tf-models/Ultra_Chrome/model.json'
    );
    // Once model is loaded, let's try using it to make a prediction!
    let prediction = model.predict(tf.tensor4d(flat_array2, [1, 5, 100, 1]));
    // Print to developer console for now.
    console.info(prediction.toString());
  }
}
