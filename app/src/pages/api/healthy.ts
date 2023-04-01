// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

/**
 * Liveness Probe
 * Determines if a container is running properly.
 */
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (process.env.LIVENESS_PROBE_FAILURE === 'true') {
    res.status(500).end()
    return
  }
  res.status(200).end()
}
