export const input = {
  title: 'BSON Date',
  bsonType: 'object',
  properties: {
    date: {
      bsonType: 'date'
    }
  },
  required: ['date'],
  additionalProperties: false
}

export const options = {
  bannerComment: '' // banner output is out of the scope of that test
}

export const output = `export interface BSONDate {
  date: Date;
}
`
