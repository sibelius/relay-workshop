import mongoose from 'mongoose';

export async function disconnectMongoose() {
  await mongoose.disconnect();
  // dumb mongoose
  mongoose.connections.forEach(connection => {
    const modelNames = Object.keys(connection.models);

    modelNames.forEach(modelName => {
      delete connection.models[modelName];
    });

    const collectionNames = Object.keys(connection.collections);
    collectionNames.forEach(collectionName => {
      delete connection.collections[collectionName];
    });
  });

  const modelSchemaNames = Object.keys(mongoose.modelSchemas);
  modelSchemaNames.forEach(modelSchemaName => {
    delete mongoose.modelSchemas[modelSchemaName];
  });
}
