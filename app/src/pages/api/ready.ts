// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

/**
 * Readiness Probe
 * Determines if a container is ready to serve requests.
 */
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {

  if (process.env.READINESS_PROBE_FAILURE === 'true') {
    res.status(500).end()
    return
  }
  res.status(200).end()
}
