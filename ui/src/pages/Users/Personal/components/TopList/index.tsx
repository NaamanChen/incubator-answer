/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';

import { pathFactory } from '@/router/pathFactory';
import { Icon } from '@/components';

interface Props {
  data: any[];
  type: 'answer' | 'question';
}
const Index: FC<Props> = ({ data, type }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'personal' });
  return (
    <ol className="mb-4 list-unstyled">
      {data?.map((item) => {
        return (
          <li
            className="mb-2"
            key={type === 'answer' ? item.answer_id : item.question_id}>
            <a
              className="me-3"
              href={
                type === 'answer'
                  ? pathFactory.answerLanding({
                      questionId: item.question_id,
                      slugTitle: item.question_info?.url_title,
                      answerId: item.answer_id,
                    })
                  : pathFactory.questionLanding(
                      item.question_id,
                      item.url_title,
                    )
              }>
              {type === 'answer' ? item.question_info.title : item.title}
            </a>

            <div className="d-inline-block text-secondary me-3 small">
              <Icon name="hand-thumbs-up-fill me-1" />
              <span>
                {item.vote_count} {t('votes', { keyPrefix: 'counts' })}
              </span>
            </div>
            {type === 'question' && (
              <div
                className={`d-inline-block text-secondary me-3 small ${
                  Number(item.accepted_answer_id) > 0 ? 'text-success' : ''
                }`}>
                {Number(item.accepted_answer_id) > 0 ? (
                  <Icon name="check-circle-fill" />
                ) : (
                  <Icon name="chat-square-text-fill" />
                )}

                <span>
                  {' '}
                  {item.answer_count} {t('answers', { keyPrefix: 'counts' })}
                </span>
              </div>
            )}

            {type === 'answer' && item.accepted === 2 && (
              <div className="d-inline-block text-success me-3 small">
                <Icon name="check-circle-fill" />
                <span> {t('accepted')}</span>
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
};

export default memo(Index);
