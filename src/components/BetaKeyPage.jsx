// src/components/SecretPage.js
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_PUBLISHABLE_KEY
);

const SecretPage = () => {
  const [betaKey, setBetaKey] = useState('');
  const [description, setDescription] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    const secretKey = urlParams.get('secret_key');

    if (!name || !secretKey) {
      setLoading(false);
      setError('URLパラメータが不足しています');
      return;
    }

    // SupabaseのRPC関数を呼び出し
    const fetchBetaKey = async () => {
      try {
        const { data, error } = await supabase.rpc('get_beta_key', {
          p_name: name,
          p_secret_key: secretKey
        });

        if (error) throw error;

        if (data && data.length > 0) {
          setBetaKey(data[0].beta_key);
          setDescription(data[0].description);
          setIsAuthorized(true);
        } else {
          setError('認証に失敗しました。');
        }
      } catch (error) {
        console.error('Access denied:', error);
        setError('アクセスが拒否されました。');
      } finally {
        setLoading(false);
      }
    };

    fetchBetaKey();
  }, []);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(betaKey);
      alert('パスワードをコピーしました！');
    } catch (err) {
      console.error('コピーに失敗しました:', err);
      alert('コピーに失敗しました。手動でコピーしてください。');
    }
  };

  if (loading) {
    return (
      <div className="App">
        <header className="App-header">
          <div className="loading">
            <h2>🔍 認証中...</h2>
            <p>アクセス権限を確認しています</p>
          </div>
        </header>
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="App">
        <header className="App-header">
          <div className="error-page">
            <h1>🚫 アクセス拒否</h1>
            <p>{error || '正しいURLからアクセスしてください。'}</p>
          </div>
        </header>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="secret-page">
					<h1>🎉特別ビルド🎉</h1>


          <div className="description">
  					<ReactMarkdown>{description}</ReactMarkdown>
					</div>

          <div className="instructions">
            <h3>📋 アンロック方法</h3>
						<hr/>
            <ol style={{ textAlign: 'left', maxWidth: '400px' }}>
              <li>Steamでゲームを右クリック</li>
              <li>「プロパティ」を選択</li>
              <li>「ベータ」タブを開く</li>
              <li>「プライベートベータ」でパスワードを入力</li>
							<ol>
								<li>
									パスワード：<code className="password">{betaKey}</code>
									<button onClick={copyToClipboard} className="copy-button">
										📋 コピー
									</button>
								</li>
							</ol>
              <li>「コードを確認」をクリック</li>
            </ol>
          </div>

          <div className="warning">
            <p>⚠️ このURLおよびパスワードは他の人と共有しないでください</p>
          </div>
        </div>
      </header>
    </div>
  );
};

export default SecretPage;