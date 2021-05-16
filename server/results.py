import pandas as pd


def get_results(model, is_separated=False):
    file_path = f"../results/{model}"
    if is_separated:
        file_path += "-separated"
    file_path += ".csv"
    df = pd.read_csv(file_path)
    return list(df)


if __name__ == "__main__":
    get_results("Ultra_Chrome", False)
