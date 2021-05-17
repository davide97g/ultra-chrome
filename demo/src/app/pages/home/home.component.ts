import { Component, OnInit, ViewChild } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import { DatasetService } from 'src/app/services/dataset.service';

import {
  ApexAxisChartSeries,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  colors: any;
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  models: string[] = ['Ultra Chrome', 'Deep Chrome', 'ChromeR', 'Base NN'];
  model: tf.LayersModel = null;
  isExpressed: boolean = true;
  positive_color: string = '#69f0ae';
  negative_color: string = '#7b1fa2';
  @ViewChild('chart') chart;
  chartOptions: Partial<ChartOptions>;
  constructor(private dataset: DatasetService) {}

  ngOnInit(): void {}

  createSeries(data: number[], number_of_series: number) {
    let series = [];
    let row_unit = data.length / number_of_series; // 500 / 5 => 100
    // s = 0,1,2,3,4
    for (let s = 0; s < number_of_series; s++) {
      let row_series = [];
      // i=0 --> 100, i=100 --> 200, ...
      for (let i = s * row_unit; i < (s + 1) * row_unit; i++)
        row_series.push({ x: '' + ((i + 1) % row_unit), y: data[i] });
      series.push({
        name: 'HM' + (s + 1),
        data: row_series,
      });
    }
    return series;
  }

  createHeatmap(dataset: number[], label: boolean) {
    this.chartOptions = {
      series: this.createSeries(dataset, 5),
      chart: {
        height: 350,
        type: 'heatmap',
      },
      dataLabels: {
        enabled: false,
      },
      colors: [label ? this.positive_color : this.negative_color],
      title: {
        text: 'Gene ' + (label ? 'Expressed' : 'Not Expressed'),
        style: {
          fontFamily: 'Fira Code Light',
          // color: '#f1faee',
        },
      },
      xaxis: {
        labels: {
          style: {
            fontFamily: 'Fira Code Light',
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            fontFamily: 'Fira Code Light',
          },
        },
      },
    };
  }

  async selectModel(model_name: string) {
    try {
      this.model = await tf.loadLayersModel(
        'assets/tf-models/' + model_name.replace(' ', '_') + '/model.json'
      );
    } catch (err) {
      console.error(err);
    }
  }

  async predict() {
    if (!this.model) console.error('Model not initialized');
    else {
      let shape = this.model.layers[0].inputSpec[0].shape;
      let tensor_test;
      let testset = this.dataset.loadExampleDataset(this.isExpressed);
      if (shape.length == 4)
        tensor_test = tf.tensor4d(testset, [
          testset.length / (shape[1] * shape[2] * shape[3]),
          shape[1],
          shape[2],
          shape[3],
        ]);
      else if (shape.length == 3)
        tensor_test = tf.tensor3d(testset, [
          testset.length / (shape[1] * shape[2]),
          shape[1],
          shape[2],
        ]);
      let prediction = this.model.predict(tensor_test);
      console.info(prediction.toString());
      this.createHeatmap(testset, this.isExpressed);
    }
  }

  upload() {
    console.info('upload');
  }
}
