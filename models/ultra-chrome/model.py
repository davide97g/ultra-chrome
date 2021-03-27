import tensorflow as tf
import numpy as np

from tensorflow.keras import layers, models
import matplotlib.pyplot as plt

from load import load_full

(train_data, train_labels), (valid_data, valid_labels), (test_data, test_labels) = load_full(1)

# Normalize pixel values to be between 0 and 1
# train_data, test_data = train_data / 255.0, test_data / 255.0

model = models.Sequential()

model.add(layers.ZeroPadding2D((1, 1), input_shape=(5, 100, 1)))

model.add(layers.Conv2D(64, (3, 3), activation="relu"))
model.add(layers.MaxPooling2D((2, 2)))

model.add(layers.Flatten())

model.add(layers.Dense(64, activation="relu"))
model.add(layers.BatchNormalization())
model.add(layers.Dense(32, activation="relu"))
model.add(layers.Dense(1))

model.summary()

model.compile(optimizer="adam", loss=tf.keras.losses.BinaryCrossentropy(from_logits=True), metrics=["accuracy"])

history = model.fit(train_data, train_labels, epochs=15, validation_data=(valid_data, valid_labels))

plt.plot(history.history["accuracy"], label="accuracy")
plt.plot(history.history["val_accuracy"], label="val_accuracy")
plt.xlabel("Epoch")
plt.ylabel("Accuracy")
plt.ylim([0.5, 1])
plt.legend(loc="lower right")
plt.show()

test_loss, test_acc = model.evaluate(test_data, test_labels, verbose=2)

print(test_acc)
