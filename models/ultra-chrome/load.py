import pandas as pd
import os
import numpy as np
from progress.bar import Bar

data_path = "../../dataset/data/"
HM_names = ["H3K27me3", "H3K26me3", "H3K4me1", "H3K4me3", "H3K9me3"]
columns_names = ["geneID", "binID", "HM1", "HM2", "HM3", "HM4", "HM5", "label"]


def load_datasets(folder_name):
    print("\t- loading datasets")
    # ? test.csv
    test_df = pd.read_csv(f"{data_path}{folder_name}/classification/test.csv", header=None, names=columns_names,)
    # ? train.csv
    train_df = pd.read_csv(f"{data_path}{folder_name}/classification/train.csv", header=None, names=columns_names,)
    # ? valid.csv
    valid_df = pd.read_csv(f"{data_path}{folder_name}/classification/valid.csv", header=None, names=columns_names,)
    return (train_df, valid_df, test_df)


def create_dataset(df, maxElements):
    data = []
    labels = []
    genes_inserted = {}

    range_ = range(int(len(df) / 100))
    if maxElements:
        range_ = range_[:maxElements]
    bar = Bar("\t- creating datasets", max=len(range_))
    for i in range_:  # todo: remove this limit to consider the full dataset
        geneID = df.iloc[i * 100]["geneID"]
        if genes_inserted.get(geneID) is None:
            genes_inserted[geneID] = True

            df_gene = df.loc[df["geneID"] == geneID]

            labels.append(df_gene.iloc[0]["label"])  # ? saving the label once and for all the gene
            # ? extract the whole list of values for the different HMs as a matrix
            # ! I had to put [:100] to limit the errors on the input data (e.i. some genes where duplicates)
            gene_data = [
                list(df_gene["HM1"])[:100],
                list(df_gene["HM2"])[:100],
                list(df_gene["HM3"])[:100],
                list(df_gene["HM4"])[:100],
                list(df_gene["HM5"])[:100],
            ]
            data.append(gene_data)
        bar.next()
    bar.finish()
    return (data, labels)


def to_numpy(data, labels):
    bar = Bar("\t- converting to numpy format", max=len(data))
    numpy_data = np.array([])
    for gene in data:
        numpy_gene = np.array([])
        for bins in gene:
            numpy_gene = np.append(numpy_gene, np.array(bins))
        numpy_data = np.append(numpy_data, numpy_gene)
        bar.next()
    bar.finish()
    numpy_data = numpy_data.reshape(len(data), 5, 100, 1)
    numpy_labels = np.array(labels)
    return numpy_data, numpy_labels


def normalize(data):
    print("\t- normalizing")
    return data


def load_full(maxFolders, maxElements=None):

    full_train_data = np.array([])
    full_valid_data = np.array([])
    full_test_data = np.array([])
    full_train_labels = np.array([])
    full_valid_labels = np.array([])
    full_test_labels = np.array([])

    dirs = os.listdir(data_path)
    if maxFolders:
        dirs = dirs[:maxFolders]
    bar = Bar("loading", max=len(dirs))
    for folder in dirs:
        (train_data, train_labels), (valid_data, valid_labels), (test_data, test_labels) = load_folder(
            folder, maxElements
        )

        # train
        full_train_data = np.append(full_train_data, train_data)
        full_train_labels = np.append(full_train_labels, train_labels)
        # valid
        full_valid_data = np.append(full_valid_data, valid_data)
        full_valid_labels = np.append(full_valid_labels, valid_labels)
        # test
        full_test_data = np.append(full_test_data, test_data)
        full_test_labels = np.append(full_test_labels, test_labels)

        bar.next()
    bar.finish()

    # ? reshaping
    full_train_data = full_train_data.reshape(len(full_train_labels), 5, 100, 1)
    full_valid_data = full_valid_data.reshape(len(full_valid_labels), 5, 100, 1)
    full_test_data = full_test_data.reshape(len(full_test_labels), 5, 100, 1)

    return (
        (full_train_data, full_train_labels),
        (full_valid_data, full_valid_labels),
        (full_test_data, full_test_labels),
    )


def load_folder(folder_name, maxElements=None):

    # loading the datasets
    train_df, valid_df, test_df = load_datasets(folder_name)

    # create the datasets with the correct format
    train_data, train_labels = create_dataset(train_df, maxElements)
    valid_data, valid_labels = create_dataset(valid_df, maxElements)
    test_data, test_labels = create_dataset(test_df, maxElements)

    # normalize data
    train_data = normalize(train_data)
    valid_data = normalize(valid_data)
    test_data = normalize(test_data)

    # numpy arrays
    train_data, train_labels = to_numpy(train_data, train_labels)
    valid_data, valid_labels = to_numpy(valid_data, valid_labels)
    test_data, test_labels = to_numpy(test_data, test_labels)

    # return tris of tuples (data,labels)
    return ((train_data, train_labels), (valid_data, valid_labels), (test_data, test_labels))


if __name__ == "__main__":
    load_full(2, 100)  # ? load all the data
    # load_folder("E003")  # ? load just a precise folder

