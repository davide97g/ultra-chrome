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

  public generateData(count, yrange) {
    var i = 0;
    var series = [];
    while (i < count) {
      var x = 'w' + (i + 1).toString();
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

      series.push({
        x: x,
        y: y,
      });
      i++;
    }
    return series;
  }

  formatSeries(row) {
    let series = [];
    for (let i = 0; i < row.length; i++) series.push({ x: i + 1, y: row[i] });
  }

  createHeatmap(dataset: number[], label: boolean) {
    this.chartOptions = {
      series: [
        {
          name: 'HM1',
          data: this.generateData(18, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: 'HM2',
          data: this.generateData(18, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: 'HM3',
          data: this.generateData(18, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: 'HM4',
          data: this.generateData(18, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: 'HM5',
          data: this.generateData(18, {
            min: 0,
            max: 90,
          }),
        },
      ],
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
      },
    };
  }

  async selectModel(model_name: string) {
    this.model = await tf.loadLayersModel(
      'assets/tf-models/' + model_name.replace(' ', '_') + '/model.json'
    );
    console.info(this.model.layers[0].inputSpec[0].shape);
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
}
