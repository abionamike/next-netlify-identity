exports.handler = async () => {
  console.log('function ran');

  const data = { name: 'Mike', age: 35, job: 'engineer' }

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  }
}