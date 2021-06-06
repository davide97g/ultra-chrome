# ultra-chrome

[![Firebase Hosting](https://github.com/davide97g/ultra-chrome/actions/workflows/firebase-hosting-merge.yml/badge.svg?branch=main)](https://github.com/davide97g/ultra-chrome/actions/workflows/firebase-hosting-merge.yml)

Repository for the Human Data Analytics Project 2020/2021.

## Project structure

```
/dataset (to download)
    /data
    - data.tar
    - data.tar.gz
/demo
/models
    /Base_NN
    /ChromeR
    /Deep_Chrome
    /separated (contains all the models trained individually)
    /Ultra_Chrome
/notebooks
    - attentive-chrome.ipynb
    - converter.ipynb
    - models.ipynb
    - parser.ipynb
    - visualize.ipynb
/papers
/report
    /assets
    - latex-project.zip
    - Report.pdf
/results
```

## Dataset

The full dataset used in this project can be found [here](https://zenodo.org/record/2652278).

## Demo

The demo was develop as an `Angular` webapp and is hosted by [`Firebase Hosting`](https://console.firebase.google.com/).

Live demo [here](https://ultra-chrome.web.app/).

## Report

In the `report` folder you can find the final `Report.pdf` along with the `latex` project I developed on [overleaf](https://www.overleaf.com/), an online latex environment.

## Usage

In order to reproduce the results reported in the `Report`:

1. Download the dataset into the `dataset` folder

1. Run `parser` notebook: loads raw data and organizes into numpy array for future processing

1. Run `models` notebook: loads the parsed dataset, trains and saves the models, computes predictions and saves results

1. Run `attentive-chrome` notebook: download the pre-trained models of AttentiveChrome and computes the predictions for every cell type of the dataset

1. Run `converter` notebook: converts the `tensorflow` saved models into javascript compatible files ready to be used inside the _demo_ webapp

1. Run `visualize` notebook: loads results and compares them with different plots

## Useful links

• [DeepChrome](https://github.com/QData/DeepChrome)

• [DeepChrome- deep-learning for predicting gene expression from histone modifications](https://qdata.github.io/deep4biomed-web//2017/06/10/EpiGenome-DeepChrome/)

• [AttentiveChrome-Deep Attention Model to Understand Gene Regulation by Selective Attention on Chromatin](https://qdata.github.io/deep4biomed-web//2017/07/30/EpiGenome-AttentiveChrome/)

• [Deep learning models in genomics: are we there yet?](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7327302/)
