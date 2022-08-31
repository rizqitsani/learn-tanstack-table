import { NextApiRequest, NextApiResponse } from 'next';

import students, { Student } from '@/data/students';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const pageSize = +req.query.page_size || 5;
    const pageNumber = +req.query.page_number;
    const sort = req.query.sort as keyof Student;
    const type = req.query.type as 'asc' | 'desc';

    let data: Student[];

    data = sort
      ? type === 'asc'
        ? students.sort((a, b) => (a[sort] > b[sort] ? 1 : -1))
        : students.sort((a, b) => (a[sort] > b[sort] ? -1 : 1))
      : students;

    data =
      pageSize && pageNumber
        ? data.slice((pageNumber - 1) * pageSize, pageNumber * pageSize)
        : data;

    res.status(200).json({
      code: 200,
      status: 'OK',
      data,
      meta: {
        current_page: pageNumber,
        from: (pageNumber - 1) * pageSize + 1,
        last_page: Math.ceil(students.length / pageSize),
        per_page: pageSize,
        to: pageNumber * pageSize,
        total: students.length,
      },
    });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
